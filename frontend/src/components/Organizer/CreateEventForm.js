import React, { useEffect, useState } from "react";
import axios from "axios";
import "intro.js/introjs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateEventForm.css";
import { toast } from "react-toastify";

import { sendMail } from "./helper/Mail";
import { db } from "../Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

import * as PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import introJs from "intro.js";
import { websiteLoc } from "../App";

function InvitationEmail(props) {
  return null;
}

InvitationEmail.propTypes = {
  to: PropTypes.string,
  from: PropTypes.string,
  eventId: PropTypes.any,
};

const initialState = {
  name: "",
  description: "",
  venue: "",
  capacity: 0,
  category: "",
  semester: "",
  orgEmail: localStorage.getItem("email"),
  eventStart: "",
  eventEnd: "",
  signUpStart: "",
  signUpEnd: "",
  isRecur: "",
  repeatType: "",
  endRecur: "",
  signUpForm: "",
  attendanceForm: "",
  feedbackForm: "",
  subscribedBy: [],
};

const CreateEventForm = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getIntro();
  }, []);

  const {
    name,
    description,
    venue,
    capacity,
    category,
    semester,
    orgEmail,
    eventStart,
    eventEnd,
    signUpStart,
    signUpEnd,
    isRecur,
    repeatType,
    endRecur,
    signUpForm,
    attendanceForm,
    feedbackForm,
    subscribedBy,
  } = state;

  const navigate = useNavigate();

  const setRealtime = async (ele) => {
    try {
      const response = await axios.post(websiteLoc + "setReal", ele);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleLinkValidation()) {
      let agree = window.confirm(
        "Are the event details correct to be submitted?"
      );
      if (agree) {
        try {
          // Define the input you want to submit as answers to the form
          var input = {
            'entry.91000574': state.name,
            'entry.503088907': state.name,
            'entry.138043134': state.name
          };
          // Construct the pre-filled URL for the form
          var baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdfPVBuSLlbVZ_Pn2wGX9J731Lem3uB-rkeQwtRwFXULKiOLw/viewform?usp=pp_url';
          var params = Object.keys(input).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(input[key]);
          }).join('&');
          var url = baseUrl + '&' + params.replace(/%20/g, '+').replace(/%2C/g, ',');
          console.log("oi");
          window.open(url);
          setTimeout(() => {
            navigate("/OrganiserDashboard");
          }, 3000);
          let realtime = {
            email: localStorage.getItem("email"),
            desc:
              "Added " +
              state.name +
              " as an event to the system with the email ",
            time: new Date(),
          };
          setRealtime(realtime);
          toast.success(
            "Event is added successfully!" + "\n Redirecting back.....",
            { position: toast.POSITION.TOP_CENTER }
          );
          // add the code to find all users in the firebase and send an email stating that an even was created
          // useEffect(() => {
          //   const q = query(collection(db, 'Users'))
          //   onSnapshot(q, (querySnapshot) => {
          //     setTasks(querySnapshot.docs.map(doc => ({
          //       email: doc.email
          //     })))
          //   })
          // },[])

          //--------------------- test emails for a test message to be sent to -----------------------------------------------------
          // const users = await query(collection(db, "Users"));

          // const querySnapshot = await getDocs(users);
          // querySnapshot.forEach((doc) => {
          //   // doc.data() is never undefined for query doc snapshots
          //   let message = "Dear ";
          //   message += doc.data().name + ", \n \n";
          //   message += description + "\n \n";
          //   let dateTime = eventStart.split("T");
          //   let time = dateTime[1].split(":");

          //   // convert the time to a user readable format
          //   const ampm = time[0] >= 12 ? "pm" : "am";
          //   time[0] %= 12;
          //   time[0] = time[0] || 12;
          //   time[1] = time[1] < 10 ? `0${time[1]}` : time[1];

          //   const strTime = `${time[0]}:${time[1]} ${ampm}`;

          //   // convert date to user readable format
          //   const months = [
          //     "January",
          //     "February",
          //     "March",
          //     "April",
          //     "May",
          //     "June",
          //     "July",
          //     "August",
          //     "September",
          //     "October",
          //     "November",
          //     "December",
          //   ];
          //   let now = new Date(dateTime[0]);
          //   const strDate =
          //     months[now.getMonth()] +
          //     " " +
          //     now.getDate() +
          //     " " +
          //     now.getFullYear();

          //   // convert the registration start time and date to readable format
          //   dateTime = signUpStart.split("T");
          //   time = dateTime[1].split(":");
          //   time[0] %= 12;
          //   time[0] = time[0] || 12;
          //   time[1] = time[1] < 10 ? `0${time[1]}` : time[1];

          //   const strRegStartTime = `${time[0]}:${time[1]} ${ampm}`;

          //   // convert date to user readable format
          //   now = new Date(dateTime[0]);
          //   const strRegStartDate =
          //     months[now.getMonth()] +
          //     " " +
          //     now.getDate() +
          //     " " +
          //     now.getFullYear();

          //   message += "Start Date: " + strDate + "\n";
          //   message += "Start Time: " + strTime + "\n";
          //   message += "Venue: " + venue + "\n \n";

          //   message +=
          //     "Registrations Open on " +
          //     strRegStartDate +
          //     " " +
          //     "at " +
          //     strRegStartTime +
          //     "\n";

          //   let stringUsersMail = doc.data().email;

          //   let title = "Invitation for " + name;

          //   sendMail({ stringUsersMail, message, title }).then((data) => {
          //     if (data.err) {
          //     } else {
          //     }
          //   });
          // });

          //--------------- end of to send email section for the users when an event is created--------------------------------------

          const response = await axios.post(websiteLoc + "createEvent", state);

        } catch (error) {
          console.error(error);
          toast.error("Event failed to be added!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      alert("Google form links must be different.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setState({ ...state, [name]: checked });
  };

  const handleLinkValidation = () => {
    let formIsValid = true;

    if (
      signUpForm == attendanceForm ||
      signUpForm == feedbackForm ||
      attendanceForm == feedbackForm
    ) {
      formIsValid = false;
    }
    return formIsValid;
  };

  const getIntro = () => {
    const hasRunCreateIntro = localStorage.getItem("hasRunCreateIntro");
    if (hasRunCreateIntro !== "1") {
      introJs()
        .setOptions({
          steps: [
            {
              title: "Welcome",
              intro: "This is the page to create a new event.",
              position: "top",
            },
            {
              element: document.querySelector("#details"),
              intro: "Please input all the mandotary details.",
              position: "right",
            },
            {
              element: document.querySelector("#submit"),
              intro:
                "Click on the submit button after completion of the details and a new event will be created.",
              position: "right",
            },
          ],
          showProgress: false,
          exitOnOverlayClick: false,
          exitOnEsc: false,
          disableInteraction: true,
        })
        .start();
      localStorage.setItem("hasRunCreateIntro", "1");
    }
  };

  return (
    <div className="col-md-12 col-lg-12">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Event Details</h3>
          <br></br>
          <div className="row g-3" id="details">
            <div className="col-12">
              <label for="title" className="form-label" id="form">
                Event Title
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                className="form-control"
                id="title"
                placeholder=""
                minLength="3"
                maxLength="100"
                required
              />
            </div>
            <div className="col-12">
              <label for="location" className="form-label" id="form">
                Venue/Link
              </label>
              <input
                type="text"
                name="venue"
                value={venue}
                onChange={handleInputChange}
                className="form-control"
                id="location"
                placeholder=""
                minLength="3"
                maxLength="100"
                required
              />
            </div>
            <div className="col-12">
              <label for="description" className="form-label" id="form">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                className="form-control"
                id="description"
                placeholder=""
                required
                rows="5"
              ></textarea>
            </div>
            <div className="col-md-6">
              <label for="capacity" className="form-label" id="form">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={capacity}
                onChange={handleInputChange}
                className="form-control"
                min="1"
                max="1000"
                step="1"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="category" className="form-label" id="form">
                Club
              </label>
              <input
                name="category"
                type="text"
                list="category"
                value={category}
                onChange={handleInputChange}
                className="form-select"
                required
              />
              <datalist id="category">
                <option value="MUSA">MUSA</option>
                <option value="MUMEC">MUMEC</option>
                <option value="MUMTEC">MUMTEC</option>
                <option value="MUSA SoE">MUSA SoE</option>
                <option value="School of Arts & Social Sciences">
                  School of Arts and Social Sciences
                </option>
                <option value="School of Business">School of Business</option>
                <option value="School of Engineering">
                  School of Engineering
                </option>
                <option value="School of Information Technology">
                  School of Information Technology
                </option>
                <option value="Jeffrey Cheah School of Medicine and Health Sciences">
                  Jeffrey Cheah School of Medicine and Health Sciences
                </option>
                <option value="School of Pharmacy">School of Pharmacy</option>
                <option value="School of Science">School of Science</option>
                <option value="EAMMSS">EAMMSS</option>
                <option value="IEMMSS">IEMMSS</option>
                <option value="RMM">RMM</option>
                <option value="ROBOCLUB">ROBOCLUB</option>
                <option value="EWB">EWB</option>
                <option value="ICE">ICE</option>
                <option value="IChemE">IChemE</option>
                <option value="IEEE">IEEE</option>
                <option value="IMechE">IMechE</option>
                <option value="MWE">MWE</option>
                <option value="SEM">SEM</option>
                <option value="FSAE">FSAE</option>
                <option value="CHEMECAR">CHEMECAR</option>
              </datalist>
            </div>
            <div className="col-md-6">
              <label for="semester" className="form-label" id="form">
                Semester
              </label>
              <input
                type="number"
                name="semester"
                min="1"
                max="2"
                value={semester}
                onChange={handleInputChange}
                className="form-control"
                id="semester"
                placeholder=""
                required
              />
            </div>
            <div className="col-md-6">
              <label for="orgEmail" className="form-label" id="form">
                Organiser Email
              </label>
              <input
                type="email"
                name="orgEmail"
                value={localStorage.getItem("email")}
                readOnly
                className="form-control"
                id="orgEmail"
                required
              />
            </div>
            <hr className="my-4" />
            <h3>Date & Time</h3>
            <div className="col-md-6">
              <label for="eventStart" id="form">
                Event Start (date and time):
              </label>
              <input
                min={new Date().toISOString().slice(0, -8)}
                type="datetime-local"
                name="eventStart"
                value={eventStart}
                onChange={handleInputChange}
                id="eventStart"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="eventEnd" id="form">
                Event End (date and time):
              </label>
              <input
                min={eventStart}
                type="datetime-local"
                name="eventEnd"
                value={eventEnd}
                onChange={handleInputChange}
                id="eventEnd"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="registrationstart" id="form">
                Registration Start (date and time):
              </label>
              <input
                min={new Date().toISOString().slice(0, -8)}
                max={eventStart}
                type="datetime-local"
                name="signUpStart"
                value={signUpStart}
                onChange={handleInputChange}
                id="registrationstart"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="registrationend" id="form">
                Registration End (date and time):
              </label>
              <input
                min={signUpStart}
                max={eventStart}
                type="datetime-local"
                name="signUpEnd"
                value={signUpEnd}
                onChange={handleInputChange}
                id="registrationend"
                required
              />
            </div>
            <hr className="my-4" />
            <h3>Repeat(optional)</h3>
            <div className="col-md-6">
              <label for="isRecur" id="form">
                Allow this event to repeat
              </label>
              <input
                type="checkbox"
                name="isRecur"
                value={isRecur}
                onChange={handleCheckbox}
                id="isRecur"
              />
            </div>
            <div className="col-md-6">
              <label for="endRecur" id="form">
                Repeat until(exclusive):
              </label>
              <input
                type="datetime-local"
                name="endRecur"
                value={endRecur}
                onChange={handleInputChange}
                id="endRecur"
              />
            </div>
            <div className="col-md-6">
              <label for="endRecur" id="form">
                Repeat:
              </label>
              <select
                name="repeatType"
                value={repeatType}
                onChange={handleInputChange}
                className="form-select"
                id="repeatType"
                required
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <hr className="my-4" />
            <h3>Links</h3>
            <div className="col-12">
              <label for="signUpForm" className="form-label" id="form">
                Sign Up Form Link
              </label>
              <input
                type="text"
                name="signUpForm"
                value={signUpForm}
                pattern="https://docs\.google\.com\/forms\/(.+)|https://forms\.gle\/(.+)"
                onChange={handleInputChange}
                className="form-control"
                id="signUpForm"
                placeholder=""
                required
              />
            </div>
            <div className="col-12">
              <label for="attendanceForm" className="form-label" id="form">
                Attendance Form Link
              </label>
              <input
                type="text"
                name="attendanceForm"
                value={attendanceForm}
                pattern="https://docs\.google\.com\/forms\/(.+)|https://forms\.gle\/(.+)"
                onChange={handleInputChange}
                className="form-control"
                id="attendanceForm"
                placeholder=""
                required
              />
            </div>
            <div className="col-12">
              <label for="feedbackForm" className="form-label" id="form">
                Feedback Form Link
              </label>
              <input
                type="text"
                name="feedbackForm"
                value={feedbackForm}
                pattern="https://docs\.google\.com\/forms\/(.+)|https://forms\.gle\/(.+)"
                onChange={handleInputChange}
                className="form-control"
                id="feedbackForm"
                placeholder=""
                required
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <button
            className="w-100 btn btn-primary btn-lg"
            type="submit"
            value="Submit"
            id="submit"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateEventForm;
