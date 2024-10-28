import { useContext } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { DashBoardLayout } from "../App"
import UserManagement from "../components/Main/User";


const Layouts = () => {
    const { type } = useContext(DashBoardLayout)


    const MainComponent = () => {
        switch (type) {
            case "user":
                return <UserManagement />;
            case "role":
                return <RoleManagement />; 
            default:
                return <div>Select a type</div>;
        }
    }

    return (
        <>
            <Header />
            <section className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <MainComponent/>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Layouts;