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

const UserList = () => {
    // Cookies for login & logout
    const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
    const auth = useSelector((state: { auth: AuthState }) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const name = JSON.parse(localStorage.getItem('user') || "") as User

    console.log(auth.user);
    console.log(auth.user?.token);

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
    const endpoint = `https://my-extravaganza.site/users`
    const endpointPage = `${endpoint}?page=${page}&limit=100`
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isAdmin: boolean = auth.user?.data.role === "Admin"

    const filters: string[] = ["Team", "Role", "Status"];
    const headers: Record<string, string> = isAdmin ?
        {
            "id": "ID",
            "full_name": "Full Name",
            "email": "Email",
            "team": "Team",
            "role": "Role",
            "status": "Status",
            "Edit": "Edit",
            "Delete": "Delete"
        } :
        {
            "id": "ID",
            "full_name": "Full Name",
            "email": "Email",
            "team": "Team",
            "role": "Role",
            "status": "Status"
        };

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTeam, setSelectedTeam] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectedTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeam(event.target.value);
    };
    const handleSelectedRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };
    const handleSelectedStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const filteredRows = rows.filter((row: any) => {
        const nameMatch = row.full_name.toLowerCase().includes(searchTerm.toLowerCase());
        const teamMatch = selectedTeam === '' || row.team.toLowerCase() === selectedTeam.toLowerCase();
        const roleMatch = selectedRole === '' || row.role.toLowerCase() === selectedRole.toLowerCase();
        const statusMatch = selectedStatus === '' || row.status.toLowerCase() === selectedStatus.toLowerCase();
        return nameMatch && teamMatch && roleMatch && statusMatch;
    });

    const everyTeam: string[] = ["Mentor", "Placement", "People", "Admission", "Academic"];
    const everyRole: string[] = ["User", "Admin"];
    const everyStatus: string[] = ["Active", "Not-Active", "Deleted"];

    const fetchTableData = async () => {
        try {
            const response = await axios.get(endpointPage);
            console.log("datatest: ", response.data.data.data);
            setRows(response.data.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, [endpoint]);

    const handleDelete = useCallback((selectedId: number) => {
        Swal.fire({
            title: `Delete user?`,
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

    const handleNewUser = (formValues: FormValues) => {
        setLoading(true);
        axios
            .post(endpoint,
                {
                    full_name: formValues.full_name,
                    email: formValues.email,
                    password: formValues.password,
                    team: formValues.team,
                    role: formValues.role,
                    status: formValues.status
                },
                { headers: { Authorization: `Bearer ${cookies.userToken}` } }
            )
            .then(result => {
                console.log("Form submitted with values: ", result)
                fetchTableData();
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    const initialUserValues: FormValues = {
        full_name: "",
        email: "",
        password: "",
        team: "",
        role: "",
        status: ""
    }

    const [userEditValues, setUserEditValues] = useState<FormValues>(initialUserValues)
    const [editMode, setEditMode] = useState(false)
    const [selectedUser, setSelectedUser] = useState(0)

    const handleEditMode = (selectedId: number) => {
        const properties = rows.find((row: any) => row.id === selectedId)
        console.log(properties)
        setEditMode(true)
        setUserEditValues({
            full_name: properties.full_name,
            email: properties.email,
            password: properties.password,
            team: properties.team,
            role: properties.role,
            status: properties.status
        })
        setSelectedUser(selectedId)
    }

    const handleEditUser = (formValues: FormValues) => {
        setLoading(true);
        axios
            .put(`${endpoint}/${selectedUser}`, {
                full_name: formValues.full_name,
                email: formValues.email,
                team: formValues.team,
                role: formValues.role,
                status: formValues.status
            },
                { headers: { Authorization: `Bearer ${cookies.userToken}` } })
            .then(result => {
                console.log("Form submitted with values: ", result)
                fetchTableData();
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Container>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Navbar
                    userName={name?.data?.full_name}
                    onLogout={handleLogout}
                    namePages='Dashboard'
                />

                <div className='flex flex-col gap-2 mx-6'>
                    <div className='flex gap-2 items-end'>
                        <Searchbar
                            searchTerm={searchTerm}
                            handleFilterChange={handleSearchInputChange}
                        />

                        {filters.map((filter: string) => {
                            return (
                                <Filter
                                    key={filter}
                                    labelText={filter}
                                    defaultOption={`Filter ${filter}`}
                                    options={eval(`every${filter}`)}
                                    selected={eval(`selected${filter}`)}
                                    handleFilterChange={eval(`handleSelected${filter}Change`)}
                                />
                            )
                        })}

                        {isAdmin ?
                            <button onClick={() => {
                                setEditMode(false);
                                setUserEditValues(initialUserValues);
                            }}>
                                <label className='text-primary btn btn-ghost' htmlFor="add-user-modal">New User</label>
                            </button> :
                            <></>}
                    </div>

                    <Table
                    key={filteredRows.id}
                        rows={filteredRows}
                        columns={headers}
                        loading={loading}
                        handleDelete={handleDelete}
                        handleEdit={handleEditMode}
                        editModal="add-user-modal"

                    />

                    <div className='flex gap-2 justify-end items-center'>
                        <button className='btn btn-primary text-white'>Prev</button>
                        <h1 className='mx-5'>{page}</h1>
                        <button className='btn btn-primary text-white'>Next</button>
                    </div>
                    <AddUser
                        onSubmit={editMode ? handleEditUser : handleNewUser}
                        editValues={userEditValues}
                        editMode={editMode}
                    />
                </div>

            </div>

        </Container>
    )
}

export default UserList