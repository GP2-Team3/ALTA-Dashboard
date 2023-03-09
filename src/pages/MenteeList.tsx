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
        "class_id": "Class",
        "education_type": "Category",
        "Details": "Details",
        "Edit": "Edit",
        "Delete": "Delete"
    }

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = rows.filter((row: any) => {
        const nameMatch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch;
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


                        <Link to={"/addnewmente"} className='text-primary btn btn-ghost'>New Mentee</Link>

                    </div>
                </div>

                <div className='flex flex-col gap-2 mx-6'>
                    <Table
                        rows={filteredRows}
                        columns={headers}
                        loading={loading}
                        handleDelete={handleDelete}
                        handleDetails={handleDetails}
                    // handleEdit={handleEditMode}
                    // editModal="add-user-modal"
                    />

                </div>

            </div>

        </Container>
    )
}

export default MenteeList