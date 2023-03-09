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

const ClassList = () => {
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
    const endpoint = `https://my-extravaganza.site/classes`
    const endpointPage = `${endpoint}?page=${page}&limit=100`
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const isAdmin: boolean = auth.user?.data.role === "Admin"

    const filters: string[] = ["Team", "Role", "Status"];
    const headers: Record<string, string> =
    {
        "id": "ID",
        "name": "Class Name",
        "start_date": "Start Date",
        "end_date": "End Date",
        "Edit": "Edit",
        "Delete": "Delete"
    }

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = rows.filter((row: any) => {
        const nameMatch = row.name.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch;
    });

    const fetchTableData = async () => {
        try {
            const response = await axios.get(endpointPage);
            console.log("datatest: ", response.data.data);
            setRows(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, [endpoint]);

    return (
        <Container>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Navbar
                    userName={name?.data?.full_name}
                    onLogout={handleLogout}
                    namePages='Classes'
                />
                <div className='flex flex-col gap-2 mx-6'>
                    <div className='flex gap-2 items-end mb-2'>
                        <Searchbar
                            searchTerm={searchTerm}
                            handleFilterChange={handleSearchInputChange}
                        />


                        {/* <button onClick={() => {
                        setEditMode(false);
                        setUserEditValues(initialUserValues);
                    }}>
                        <label className='text-primary btn btn-ghost' htmlFor="add-user-modal">New User</label>
                    </button> */}
                    </div>
                </div>

                <div className='flex flex-col gap-2 mx-6'>
                    <Table
                        rows={filteredRows}
                        columns={headers}
                        loading={loading}
                    // handleDelete={handleDelete}
                    // handleEdit={handleEditMode}
                    // editModal="add-user-modal"
                    />

                </div>

            </div>

        </Container>
    )
}

export default ClassList