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

    const validate = () => {
        let errors = [];
        const formats = [".com", ".net", ".org", ".gov", ".edu", ".io"]
        if (user.name.length === 0) {
            errors.push("Name can't be blank")
        }

        if(user.email.length === 0) {
            errors.push("Email can't be blank");
        }
        let validEmail = false;
        formats.forEach( el => {
            if(user.email.includes(el)) validEmail = true;
        })

        if (!validEmail || !user.email.includes("@")){
            errors.push("Invalid Email")
        }
        
        const digits = ['1','2','3','4','5','6','7','8','9','0']
        let validNumber = true;

        user.phoneNumber.split("").forEach(n => {
            if(!digits.includes(n)) validNumber = false;
        })
        if(user.phoneNumber){
            if (user.phoneNumber.length !== 10 || !validNumber) {
                errors.push("Invalid phone number")
            }
        }
        if(!errors.includes("Invalid phone number") && !user.phoneType) {
            errors.push("Select a phone type");
        } 
        else if(errors.includes("Invalid phone number") && !user.phoneType) {
            errors.push("Select a phone type");
        }

        if(user.bio.length > 280) {
            errors.push("Bio too long");
        }

        return errors;
    }

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
        let errors = validate();

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
                    <select name="Phone Type" value= {user.phoneType} onChange={handleChange('phoneType')}>
                        <option value="" selected disabled></option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                </label>
                <br></br>
                <input 
                    type="radio"
                    value="Instructor"
                    name="staff"
                /> Instructor
                <input
                    type="radio"
                    value="Student"
                    name="staff"
                /> Student
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