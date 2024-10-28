

const AddModals = () => {

    return (
        <>  
            <div>
                <table cellPadding={10}>
                    <tr>
                        <td>Username: </td>
                        <td>
                            <input type="text" name="username" required placeholder="type your username ..."/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password: </td>
                        <td><input type="password" name="password" required placeholder="type your password..."/></td>
                    </tr>
                    <tr>
                        <td><button>Confirm</button></td>
                        <td><button>Cancel</button></td>
                    </tr>
                </table>
            </div>

        </>
    )
}
export default AddModals;