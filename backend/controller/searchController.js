import User from "../models/User.js"

const getUserByString = async (req, res) => {
    try {
        const {string} = req.headers

        // let users = await User.find({
        //     name: {string}
        // })

        let s = '5fadb6df497e5e36109ccd74'

        // console.log(users)

        res.status(201).json({
            myFriends
        })

    } catch (error) {
    res.status(501).send("wtf is happening");
        
    }
}  
 
export {getUserByString}