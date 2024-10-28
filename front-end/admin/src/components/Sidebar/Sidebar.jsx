import "../Sidebar/Sidebar.css"

const Sidebar = () => {
    const handleClick = (event) => {
        event.preventDefault();
        const subUser = document.getElementById("subUser");
        const ul = subUser.querySelector("ul");
        let show = ul.style.display;

        if (show === "none") {
            ul.style.display = "block"
        }
        else {
            ul.style.display = "none"
        }
    }
    return (
        <>
            <section className="dashboard">
                <ul>
                    <li className="subUser" id="subUser" onClick={handleClick}>
                        <a href="">User</a>
                        <ul>
                            <li>
                                <a href="">List User</a>
                            </li>
                            <li>
                                <a href="">Add User</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="">Role</a>
                    </li>
                </ul>
            </section>
        </>
    )
}
export default Sidebar