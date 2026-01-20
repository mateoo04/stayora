import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout(){
    return (<><Header/><main className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col"><Outlet/></main></>)
}