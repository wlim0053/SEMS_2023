// stub code
import React, { useState } from "react"
import Calendar from "../../components/Calendar"
import CountdownTimer from "../../components/student/CountdownTimer"
import StudentEvents from "../../components/StudentEvents"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function StudentHome() {
	const [showCalendar, setShowCalendar] = useState(false)

	const handleToggle = () => {
		setShowCalendar(!showCalendar)
	}

	const navigate = useNavigate()

	const handleGoToEvent = () => {
		navigate("/EventHome")
	}

	return (
		<div>
			<CountdownTimer />
			<Button
				backgroundColor="#006dac"
				_hover={{ backgroundColor: "#005c8c" }}
				color={"white"}
				onClick={handleToggle}
				ml={{ base: "1rem", md: "2rem" }}
				mt={{ base: "1rem", md: "2rem" }}
			>
				{showCalendar ? "Show My Events" : "Show Calendar"}
			</Button>
			<Button
				backgroundColor="#006dac"
				_hover={{ backgroundColor: "#005c8c" }}
				color={"white"}
				ml={{ base: "1rem", md: "2rem" }}
				mt={{ base: "1rem", md: "2rem" }}
				onClick={handleGoToEvent}
			>
				Events Page
			</Button>
			{showCalendar ? <Calendar /> : <StudentEvents />}
		</div>
	)
}

export default StudentHome
