import React, {useState, useRef} from 'react';


function Form (props) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        phoneType: '',
        staff: '',
        bio: '',
        notification: ''
    })

    const [errors, setErrors] = useState([])

    const handleChange = (field) => {
        return (e) => {
            console.log(e)
            console.log(user)
            const newObj = Object.assign({}, user, {[field]: e.target.value})
            setUser(newObj)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = [];
        console.log(user);
        if (errors.length) {
            setErrors(errors)
        }
    }

    const showErrors = () => {
        if (!errors.length) return null;
        return (
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        )
    }

    return (
        <div>
            {showErrors()}

            <form className = 'form' onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label>Name
                    <input 
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange('name')}
                    />    
                </label> 
                <br></br>
                <label>Email
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange('email')}
                    />
                </label>
                <br></br>
                <label>Phone Number
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={user.phoneNumber}
                        onChange={handleChange('phoneNumber')}
                    />
                </label>
                <br></br>
                <label>Phone Type
                    <select name="Phone Type">
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                </label>
                <br></br>
                <label>Staff 
                    <input 
                        type="radio"
                        value="Instructor"
                        name="staff"
                    />
                    <input
                        type="radio"
                        value="Student"
                        name="staff"
                    />
                </label>
                <br></br>
                <label>Bio
                    <textarea
                        rows="10"
                        cols="35"
                        placeholder="Bio"
                        value={user.bio}
                        onChange={handleChange('bio')}
                    ></textarea>
                </label>
                <br>
                </br>
                <label>Receive Email Notifications
                    <input
                        type="checkbox"
                        value={user.notifications}
                        onChange={handleChange('notification')}
                    />
                </label>
                <br></br>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Form;