import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Container from "../components/Container";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { AuthState, User, logout } from "../store/features/userSlice";
import AddUser, { FormValues } from "../components/AddUser";
import ModalClass, { FormClassValues } from "../components/ModalClass";
import { MdClass } from "react-icons/md";

const ClassList = () => {
  // Cookies for login & logout
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = JSON.parse(localStorage.getItem("user") || "") as User;

  //   console.log(auth.user);
  //   console.log(auth.user?.token);

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
  const endpoint = `https://my-extravaganza.site/classes`;
  const endpointPage = `${endpoint}?page=${page}&limit=100`;
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isAdmin: boolean = auth.user?.data.role === "Admin";

  const headers: Record<string, string> = {
    id: "ID",
    name: "Class Name",
    start_date: "Start Date",
    end_date: "End Date",
    Edit: "Edit",
    Delete: "Delete",
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
  // end tables

  useEffect(() => {
    fetchTableData();
  }, [endpoint]);

  //   "name": "Immersive Front End Batch 12",
  //   "short_name": "FE 12",
  //   "start_date": "2023-03-22",
  //   "end_date": "2023-06-22"
  const [className, setClassName] = useState("");
  const [shortName, setShortName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const _class = {
    name: className,
    short_name: shortName,
    start_date: startDate,
    end_date: endDate,
  };

  const addNewClass = async () => {
    await axios
      .post("https://my-extravaganza.site/classes", _class, {
        headers: { Authorization: `Bearer ${cookies.userToken}` },
      })
      .then((res) => {
        console.log("res: ", res.data);
        fetchTableData();
      })
      .catch((err) => console.error(err));
  };

  //handle Edit user
  const initialClassValues: FormClassValues = {
    name: "",
    short_name: "",
    start_date: "",
    end_date: "",
  };
  const [classEditValues, setClassEditValues] = useState<FormClassValues>(initialClassValues);
  const [editMode, setEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number>();

  const handleEditMode = (selectedId: number) => {
    const properties = rows.find((row: any) => row.id === selectedId);
    console.log(properties);
    setEditMode(true);
    setClassEditValues({
      name: properties.name,
      short_name: properties.short_name,
      start_date: properties.start_date,
      end_date: properties.end_date,
    });
    setSelectedClass(selectedId);
  };

  const handleEditUser = (formValues: FormClassValues) => {
    setLoading(true);
    axios
      .put(
        `https://my-extravaganza.site/classes/${selectedClass}`,
        {
          name: formValues.name,
          short_name: formValues.short_name,
          start_date: formValues.start_date,
          end_date: formValues.end_date,
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

  // handle for delete
  const handleDelete = useCallback((selectedId: number) => {
    Swal.fire({
      title: `Delete Class ?`,
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
          .delete(`https://my-extravaganza.site/classes/${selectedId}`, {
            headers: { Authorization: `Bearer ${cookies.userToken}` },
          })
          .then((result) => {
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
          .catch((error) => console.log(error))
          .finally(() => setLoading(false));
      }
    });
  }, []);

  
  
  return (
    <Container>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar
          userName={name?.data?.full_name}
          onLogout={handleLogout}
          namePages="Classes"
        />
        <div className="flex flex-col gap-2 mx-6">
          <div className="flex gap-2 items-end mb-2">
            <Searchbar
              searchTerm={searchTerm}
              handleFilterChange={handleSearchInputChange}
            />

            {/* <!-- Modal toggle --> */}
            <label htmlFor="my-modal-6" className="btn btn-ghost bg-white hover:text-orange-alta hover:bg-white text-dark-alta">
            <MdClass size={40} />
            Add Class
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <div className="flex flex-col align-middle mt-5 gap-2">
                  <div className="flex justify-center text-dark-alta font-semibold text-xl mb-5">
                    ADD NEW CLASS
                  </div>
                  <p className="flex flex-start text-dark-alta font-semibold">
                    Name :{" "}
                  </p>
                  <input
                    onChange={(e) => setClassName(e.target.value)}
                    type="text"
                    className="input flex flex-start border rounded-md h-12 border-dark-alta"
                    placeholder="Immersive FE batch 12"
                  />
                </div>
                <div className="flex flex-col align-middle mt-5 gap-2">
                  <p className="flex flex-start text-dark-alta font-semibold">
                    Short Name :{" "}
                  </p>
                  <input
                    onChange={(e) => setShortName(e.target.value)}
                    type="text"
                    className="input flex flex-start border rounded-md h-12 border-dark-alta"
                    placeholder="FE 12"
                  />
                </div>
                <div className="flex flex-col align-middle mt-5 gap-2">
                  <p className="flex flex-start text-dark-alta font-semibold">
                    Start Date :{" "}
                  </p>
                  <input
                    onChange={(e) => setStartDate(e.target.value)}
                    type="text"
                    className="input flex flex-start border rounded-md h-12 border-dark-alta"
                    placeholder="2023-03-22"
                  />
                </div>
                <div className="flex flex-col align-middle mt-5 gap-2">
                  <p className="flex flex-start text-dark-alta font-semibold">
                    End Date :{" "}
                  </p>
                  <input
                    onChange={(e) => setEndDate(e.target.value)}
                    type="text"
                    className="input flex flex-start border rounded-md h-12 border-dark-alta"
                    placeholder="2023-06-22"
                  />
                </div>
                <div className="flex flex-row justify-end align-middle gap-2 mt-4">
                  <label
                    htmlFor="my-modal-6"
                    className="modal-action btn-sm w-20 my-auto btn  bg-white border border-orange-alta hover:bg-orange-alta hover:text-white hover:border-none text-orange-alta "
                  >
                    Cancel
                  </label>
                  <button
                    onClick={addNewClass}
                    type="submit"
                    className="btn btn-sm bg-orange-alta border border-orange-alta text-white w-20 hover:text-orange-alta hover:bg-white hover:border-orange-alta"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* <button onClick={() => {
                        setEditMode(false);
                        setUserEditValues(initialUserValues);
                    }}>
                        <label className='text-primary btn btn-ghost' htmlFor="add-user-modal">New User</label>
                    </button> */}
          </div>
        </div>
        <ModalClass
          onSubmit={handleEditUser}
          editValues={classEditValues}
          editMode={editMode}
        />
        <div className="flex flex-col gap-2 mx-6">
          <Table
          
            rows={filteredRows}
            columns={headers}
            loading={loading}
            handleDelete={handleDelete}
            handleEdit={handleEditMode}
            editModal="add-user-modal"
          />
        </div>
      </div>
    </Container>
  );
};

export default ClassList;
