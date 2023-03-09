import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Container from '../components/Container';
import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import { AuthState, User, logout } from '../store/features/userSlice';
import AddUser, { FormValues } from '../components/AddUser';
import { Link } from 'react-router-dom';
import ModalMentees, { FromMenteesValue } from '../components/ModalMentees';
import { FaUsers } from 'react-icons/fa';

const MenteeList = () => {
    // Cookies for login & logout
    const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
    const auth = useSelector((state: { auth: AuthState }) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const name = JSON.parse(localStorage.getItem('user') || "") as User

    const handleLogout = useCallback(() => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Logout successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                dispatch(logout());
                removeCookie("userToken");
                navigate("/");
            }
        });
    }, []);

    useEffect(() => {
        if (!cookies.userToken) {
            dispatch(logout());
        }
    }, [cookies.userToken, dispatch]);

    // Tables
    const [page, setPage] = useState<number>(1);
    const endpoint = `https://my-extravaganza.site/mentees`
    const endpointClass = `https://my-extravaganza.site/classes?page=1&limit=100`
    const endpointPage = `${endpoint}?page=${page}&limit=100`
    const [rows, setRows] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isAdmin: boolean = auth.user?.data.role === "Admin"

    const filters: string[] = ["Team", "Role", "Status"];
    const headers: Record<string, string> =
    {
        "id": "ID",
        "full_name": "Name",
        "class_name": "Class",
        "education_type": "Category",
        "status": "Status",
        "Details": "Details",
        "Edit": "Edit",
        "Delete": "Delete"
    }

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const handleSelectedClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedClass(event.target.value);
    };
    const handleSelectedStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const rowsWithClass: any = Object.values(rows).map((row: any) => ({
        ...row,
        class_name: classes.find((classy: any) => classy.id === row.class_id)?.name
    }));

    const filteredRows = rowsWithClass.filter((row: any) => {
        const nameMatch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const classMatch = selectedClass === '' || row.class_name == classes.find((classy: any) => classy.short_name === selectedClass)?.name;
        const statusMatch = selectedStatus === '' || row.status.toLowerCase() === selectedStatus.toLowerCase();
        return nameMatch && classMatch && statusMatch;
    });

    const fetchTableData = async () => {
        try {
            const response = await axios.get(endpointPage);
            console.log("Mentees: ", response.data.data);
            setRows(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClassData = async () => {
        try {
            const response = await axios.get(endpointClass);
            console.log("Classes: ", response.data.data);
            setClasses(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTableData();
        fetchClassData();
    }, [endpoint]);





    const everyClass: string[] = Object.keys(classes).map((classId) => classes[classId].short_name);
    const everyStatus: string[] =
        [
            "Interview",
            "Join Class",
            "Unit 1",
            "Unit 2",
            "Unit 3",
            "Repeat Unit 1",
            "Repeat Unit 2",
            "Repeat Unit 2",
            "Placement",
            "Eliminated",
            "Graduated"
        ];

    console.log("newRow", rowsWithClass)

    console.log(classes.find((classy: any) => classy.id === 1)?.name)

    const handleDelete = useCallback((selectedId: number) => {
        Swal.fire({
            title: `Delete mentee?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axios
                    .delete(
                        `${endpoint}/${selectedId}`,
                        { headers: { Authorization: `Bearer ${cookies.userToken}` } }
                    )
                    .then(result => {
                        console.log("Row deleted: ", result);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "Delete successful",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        fetchTableData();
                    })
                    .catch(error => console.log(error))
                    .finally(() => setLoading(false))
            }
        });
    }, []);

    const handleDetails = (selectedID: number) => {
        navigate(`/menteelog/${selectedID}`);
    }


    // handle Edit Mentees
    const initialMenteesValues: FromMenteesValue = {
        full_name: '',
        email: '',
        address: '',
        phone: '',
        telegram: '',
        emergency_name: '',
        emergency_phone: '',
        emergency_status: '',
        education_type: '',
        education_major: '',
        education_grad_date: ''
    };
    const [menteesEditValues, setMenteesEditValues] = useState<FromMenteesValue>(initialMenteesValues);
    const [editMode, setEditMode] = useState(false);
    const [selectedMentees, setSelectedMentees] = useState<number>();

    const handleEditMode = (selectedId: number) => {
        const properties = rows.find((row: any) => row.id === selectedId);
        console.log(properties);
        setEditMode(true);
        setMenteesEditValues({
            full_name: properties.full_name,
            email: properties.email,
            address: properties.address,
            phone: properties.phone,
            telegram: properties.telegram,
            emergency_name: properties.emergency_name,
            emergency_phone: properties.emergency_phone,
            emergency_status: properties.emergency_status,
            education_type: properties.education_type,
            education_major: properties.education_major,
            education_grad_date: properties.education_grad_date,

        });
        setSelectedMentees(selectedId);
    };

    const handleEditMentees = (formValues: FromMenteesValue) => {
        setLoading(true);
        axios
            .put(
                `https://my-extravaganza.site/mentees/${selectedMentees}`,
                {
                    full_name: formValues.full_name,
                    email: formValues.email,
                    address: formValues.address,
                    phone: formValues.phone,
                    telegram: formValues.telegram,
                    emergency_name: formValues.emergency_name,
                    emergency_phone: formValues.emergency_phone,
                    emergency_status: formValues.emergency_status,
                    education_type: formValues.education_type,
                    education_major: formValues.education_major,
                    education_grad_date: formValues.education_grad_date,
                },
                { headers: { Authorization: `Bearer ${cookies.userToken}` } },
            )
            .then((result) => {
                console.log("Form submitted with values: ", result);
                fetchTableData();
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    return (
        <Container>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Navbar
                    userName={name?.data?.full_name}
                    onLogout={handleLogout}
                    namePages='Mentees'
                />


                <div className='flex flex-col gap-2 mx-6'>
                    <div className='flex gap-2 items-end mb-2'>
                        <Searchbar
                            searchTerm={searchTerm}
                            handleFilterChange={handleSearchInputChange}
                        />

                        <Filter
                            labelText="Class"
                            defaultOption="Filter Class"
                            options={everyClass}
                            selected={selectedClass}
                            handleFilterChange={handleSelectedClassChange}
                        />

                        <Filter
                            labelText="Status"
                            defaultOption="Filter Status"
                            options={everyStatus}
                            selected={selectedStatus}
                            handleFilterChange={handleSelectedStatusChange}
                        />

                        <Link to={"/addnewmente"} className='btn btn-ghost bg-white hover:text-orange-alta hover:bg-white text-dark-alta'><FaUsers size={40} /> <span className='ml-2'>Add New Mentee</span></Link>

                    </div>
                </div>
                <ModalMentees
                    onSubmit={handleEditMentees}
                    editValues={menteesEditValues}
                    editMode={editMode}
                />
                <div className='flex flex-col gap-2 mx-6'>
                    <Table
                        rows={filteredRows}
                        columns={headers}
                        loading={loading}
                        handleDelete={handleDelete}
                        handleDetails={handleDetails}
                        handleEdit={handleEditMode}
                        editModal="add-user-modal"
                    />

                </div>

            </div>

        </Container>
    )
}

export default MenteeList