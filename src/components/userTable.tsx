"use client"
import  { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Selection,
  SortDescriptor,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import {User as user } from "@/types/types";
import { FiEdit3 } from "react-icons/fi";
import AddModal from "./addModal";
import { delete_user, getUsers } from "@/actions/image.actions";
import { useOnlineUsers } from "@/providers/onlineUserProvider";
import { useSession } from "next-auth/react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import EditModal from "./editModal";

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}



export const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "USER", uid: "name", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "PHONE NUMBER", uid: "phone_number"},
  {name: "COME TO WORK", uid: "status", sortable: true}, // jai wela majech
  {name:"ACTION",uid:"action"}
];


const INITIAL_VISIBLE_COLUMNS = ["id","name","phone_number","email", "role", "status", "action"];

export const statusOptions = [
  {name: "YES", uid: "yes"},
  {name: "NO", uid: "no"},
];



export default function UserTable() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [users, setUsers] = useState<user[]>([])
  const {isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2} = useDisclosure();
  const {isOpen: isOpen, onOpen: onOpen, onOpenChange: onOpenChange} = useDisclosure();
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const {data : session} = useSession()
  const {onlineUsers} =useOnlineUsers()
  const [sortDescriptor, setSortDescriptor] =useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const [id,setId] = useState(0)

  console.log("onlineUsers",onlineUsers)

  const Delete =useCallback( async (id : number) => {
    await delete_user(id.toString()).then((res) => {
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    }).catch((err) => {
      console.log(err);
      toast.error("Error deleting user");
    })
  },[users])


  useEffect( () => {
    if (users.length > 0) return;
    setLoading(true);
    const GetAllUsers = async () => {
      await getUsers().then((res) => {
        setUsers(res.data);
        console.log(users,res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
    GetAllUsers();
  }, [users]);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        (user.first_name.toLowerCase().includes(filterValue.toLowerCase()) || user.last_name.toLowerCase().includes(filterValue.toLowerCase())),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(onlineUsers.filter((u) => u.id === user.id)[0]?.online_at ? "yes" : "no" ),
      );
    }


    return filteredUsers;
  }, [users, hasSearchFilter, statusFilter, filterValue, onlineUsers]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: user, b: user) => {
      const first = a[sortDescriptor.column as keyof user] as number;
      const second = b[sortDescriptor.column as keyof user] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: user, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof user];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.first_name+" "+user.last_name}</p>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.role}</p>
          </div>
        );
        case "phone_number":
        return (
          <div className="flex flex-col w-full">
            <p className="text-bold text-small capitalize ">{user.phone_number}</p>
          </div>
        );
        case "status":
          return onlineUsers.map((user :any) => user.id).includes(user.id) ? (
            <Chip className="capitalize font-semibold " color="success"  size="md" variant="flat">
              {onlineUsers.filter((on : any)=> on.id === user.id)[0].online_at.split("T")[1].slice(0,5)}
            </Chip>
          ) : ( 
            <Chip className="capitalize font-semibold " color="danger" size="md" variant="flat">
              NO
            </Chip>
          );
          case "action":
          return(
            <div className="flex gap-2 w-full justify-start">
              <Button isIconOnly onClick={()=>{Delete(user.id)}} variant="light" ><MdDelete size={20} className="text-dark_green"/></Button>
              <Button isIconOnly onClick={()=>{
                setId(user.id)
                onOpenChange()
              }} variant="light" ><FiEdit3 size={20} className="text-dark_grey"/></Button>
            </div>
          )
      default:
        return cellValue;
    }
  }, [Delete, onOpenChange, onlineUsers]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] "
            placeholder="Search by name..."
            // startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button  variant="flat" className="shadow-md">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat" className="shadow-md">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {session?.user.role === "admin" && <Button onClick={onOpen2} className="bg-dark_green text-yellow shadow-md" >
              Add New
            </Button>}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, statusFilter, visibleColumns, session?.user.role, onOpen2, users.length, onRowsPerPageChange, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" className="shadow-md" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} className="shadow-md" size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, pages, onPreviousPage, onNextPage]);

  return (
    <> 
    <AddModal setUsers={setUsers} isOpen={isOpen2} onOpenChange={onOpenChange2} />
    <EditModal isOpen={isOpen} onOpenChange={onOpenChange} users={users} setUsers={setUsers} id={id}/>
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody isLoading={loading} loadingContent={<Spinner color="default" />} emptyContent={"No users found"} items={sortedItems}>
        { (item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  );
}
