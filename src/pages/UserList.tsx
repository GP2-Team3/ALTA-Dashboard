import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import CardDashboard from '../components/CardDashboard';
import Container from '../components/Container';
import Filter from '../components/Filter';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import { AuthState, User, logout } from '../store/features/userSlice';

const UserList = () => {
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

    const [page, setPage] = useState<number>(1);
    const endpoint = `https://api-generator.retool.com/zS55yz/data?_page=${page}&_limit=10`
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const filters: string[] = ["Team", "Role", "Status"];
    const headers: Record<string, string> = {
        "id": "No.",
        "FullName": "Full Name",
        "Email": "Email",
        "Team": "Team",
        "Role": "Role",
        "Status": "Status",
        "Edit": "Edit",
        "Delete": "Delete"
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
        const nameMatch = row.FullName.toLowerCase().includes(searchTerm.toLowerCase());
        const teamMatch = selectedTeam === '' || row.Team.toLowerCase() === selectedTeam.toLowerCase();
        const roleMatch = selectedRole === '' || row.Role.toLowerCase() === selectedRole.toLowerCase();
        const statusMatch = selectedStatus === '' || row.Status.toLowerCase() === selectedStatus.toLowerCase();
        return nameMatch && teamMatch && roleMatch && statusMatch;
    });

    const everyTeam: string[] = ["Mentor", "Placement", "People", "Admission", "Academic"];
    const everyRole: string[] = ["User", "Admin"];
    const everyStatus: string[] = ["Active", "Not-Active", "Deleted"];

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get(endpoint);
                console.log("data: ", response.data);
                setRows(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTableData();
    }, [endpoint]);

    const handleAddNew = () => {

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
                                    labelText={filter}
                                    defaultOption={`Filter ${filter}`}
                                    options={eval(`every${filter}`)}
                                    selected={eval(`selected${filter}`)}
                                    handleFilterChange={eval(`handleSelected${filter}Change`)}
                                />
                            )
                        })}

                        <button className='text-primary btn btn-ghost'>New User</button>
                    </div>

                    <Table
                        rows={filteredRows}
                        columns={headers}
                        loading={loading}
                    />

                    <div className='flex gap-2 justify-end items-center'>
                        <button className='btn btn-primary text-white'>Prev</button>
                        <h1 className='mx-5'>{page}</h1>
                        <button className='btn btn-primary text-white'>Next</button>
                    </div>
                </div>

            </div>

        </Container>
    )
}

export default UserList