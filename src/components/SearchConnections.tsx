import { useEffect, useState } from "react"
import { getAllUsers, getUserFollowing } from "../util/apiHelper"
import { PagedUserType, UserType } from '../util/types';
import Connection from "./Connection";
import { useAppSelector } from "../app/hooks";
import { useOutletContext } from "react-router-dom";
import { Box, IconButton } from "@mui/joy";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function SearchConnections() {
    const authStore = useAppSelector(store => store.auth);
    const { search } = useOutletContext<{ search: string }>();
    const [connections, setConnections]: [UserType[], any] = useState([]);
    const [following, setFollowing]: [UserType[], any] = useState([]);
    const [page, setPage]: [number, any] = useState(0);
    const [size, setSize]: [number, any] = useState(5);
    const [hasNext, setHasNext]: [boolean, any] = useState(false);
    const [totalPages, setTotalPages]: [number, any] = useState(0);

    useEffect(() => {
        getAllUsers(search, page, size)
            .then((data) => {
                setConnections(data.users.filter(c => c.id != authStore.auth?.id));
                setHasNext(data.hasNext);
                setTotalPages(data.totalPages);
            })
        getUserFollowing(search)
            .then((data) => {
                setFollowing(data)
            })
    }, [search, page])

    function handlePrev() {
        if(page == 0){
            return;
        }
        setPage(page - 1);
    }

    function handleNext() {
        if(!hasNext){
            return;
        }
        setPage(page + 1);
    }

    return (
        <>
            {connections.map((connection: UserType) => {
                return (
                    <Connection key={connection.id} connection={connection} following={following} setFollowing={setFollowing} />
                )
            })}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={handlePrev}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                {`${page + 1}/${totalPages}`}
                <IconButton
                    onClick={handleNext}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </>
    )
}