import './LandingPage.css'
import Footer from './Footer'

const LandingPage = () => {

  return (
    <div>
        <h1 id = 'main-title'>STUDENT EXPERIENCE MANAGEMENT SYSTEM</h1>
        <div className = 'container-div'>
            <img src = "/public/image1.jpg" width= {950} height = {550} alt = ""/>
        </div>
        <div className = 'single-row'>
            <h1 id='row-header'>How does Student Experience Management Sytem Work?</h1>
        </div>

        
        <div className = 'container-fluid' id="student_c">
                <div className='flex-container' id='studentFlex'>
                    <div className="col">
                        <h2 id="stud">Students</h2>
                        <p>Students are able to perform the following actions using the system:</p>
                        <ul id="list1">
                            <li>Register for events</li>
                            <li>View events that they have signed up for, on a personal calendar</li>
                            <li>Search for all events organised by different schools and clubs</li>
                            <li>Track all previously attended events</li>
                        </ul>
                    </div>
                </div>
                <div className="flex-container" id="orgFlex">
                    <div className="col">
                        <h2 id="org">Organisers</h2>
                        <p>Organizers are able to perform the following actions using the system:</p>
                        <ul id = "list2">
                        <li>Create events</li>
                        <li>Manage the events created</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
    </div>
    

  )
}

export default LandingPage