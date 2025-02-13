import * as React from "react";
import { useCourseQuery } from "../hooks/useCourseQuery";
import { useState } from "react";
import Courses from "../components/Courses/Courses";
import addNew from "../components/Courses/Images/addNew.png";
import Calender from "../components/Calender/Calender";

import favicon from "./favicon.ico";
import linkedin from "./linkedin.png";
import mirage from "./projectMirage.png";
import instagram from "./instagram.png";

import "./index.sass";

//add helmet for seo and metadata
import { Helmet } from "react-helmet";

const IndexPage = () => {
    const data = useCourseQuery();
    const [credits, setCredits] = useState(0);
    //Course data
    const [courseCode, setCourseCode] = useState();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const addCourse = (courseID, chr) => {
        if (
            selectedCourses.filter((course) => course.id === courseID)
                .length === 0
        ) {
            setSelectedCourses(
                selectedCourses.concat(
                    data.nodes.filter((course) => course.id === courseID)
                )
            );
            setCredits(credits + parseInt(chr));
            // console.log(courseID)
        }
    };

    const removeCourse = (courseID) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.id !== courseID)
        );
        setFinalCourses(
            finalCourses.filter((course) => !course.id.match(courseID))
        );
        setCredits(
            credits -
                parseInt(
                    finalCourses.filter((course) =>
                        course.id.match(courseID)
                    )[0].Cr_Hrs
                )
        );
    };

    const [finalCourses, setFinalCourses] = useState([]);
    const addFinalCourse = (courseCopyFinal) => {
        if (
            finalCourses.filter((course) => course.id === courseCopyFinal.id)
                .length === 0
        ) {
            setFinalCourses(finalCourses.concat(courseCopyFinal));
        }
    };
    //Course Panel
    const [courseSelector, setCourseSelector] = useState(false);
    const toggleCourseSelector = () => {
        setCourseSelector(!courseSelector);
    };

    //parsing functions
    const parseDay = (inputDayTime) => {
        var dayAndTime = inputDayTime.split(" ");
        var days = dayAndTime[0].split("");
        for (let i = 0; i < days.length; i++) {
            if (days[i] === "M") {
                days[i] = "Monday";
            } else if (days[i] === "T") {
                days[i] = "Tuesday";
            } else if (days[i] === "W") {
                days[i] = "Wednesday";
            } else if (days[i] === "R") {
                days[i] = "Thursday";
            } else if (days[i] === "F") {
                days[i] = "Friday";
            } else if (days[i] === "S") {
                days[i] = "Saturday";
            } else if (days[i] === "U") {
                days[i] = "Sunday";
            }
        }
        return days;
    };

    const parseTimeLength = (dayAndTime) => {
        // console.log(dayAndTime)
        var timeString = dayAndTime.split(" ")[1].split("-");
        // console.log(timeString)

        var timeStart = timeString[0];
        var timeEnd = timeString[1];

        // console.log(timeStart)
        // console.log(timeEnd)

        var minutesDiff = 0;

        if (timeStart.slice(0, 2) === "12" && timeEnd.slice(-2) === "PM") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                60 * 12 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "5");
        } else if (
            timeEnd.slice(0, 2) === "12" &&
            timeStart.slice(-2) === "AM"
        ) {
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "2");
        } else if (timeEnd.slice(-2) === "PM" && timeStart.slice(-2) === "AM") {
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                60 * 12 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "3");
        } else if (
            (timeEnd.slice(-2) === "AM" && timeStart.slice(-2) === "AM") ||
            (timeEnd.slice(-2) === "PM" && timeStart.slice(-2) === "PM")
        ) {
            // console.log(parseInt(timeEnd.split(":")[0])*60 + parseInt(timeEnd.slice(2)))
            var minutesEnd =
                parseInt(timeEnd.split(":")[0]) * 60 +
                parseInt(timeEnd.split(":")[1].slice(0, 2));
            console.log(minutesEnd);
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            console.log(minutesStart);
            minutesDiff = minutesEnd - minutesStart;
            console.log(minutesDiff + "A");
        }

        return minutesDiff;
    };

    const parseTimeMargin = (timeStart) => {
        // console.log(timeString)

        var timeInital = 420;

        // console.log(timeStart)
        // console.log(timeEnd)

        var minutesDiff = 0;

        if (timeStart.slice(-2) === "AM") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            // console.log(minutesStart)
            minutesDiff = minutesStart - timeInital;
            // console.log(minutesDiff)
        } else if (timeStart.slice(0, 2) === "12") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesStart - timeInital;
            // console.log(minutesDiff)
        } else if (timeStart.slice(-2) === "PM") {
            var minutesStart =
                parseInt(timeStart.split(":")[0]) * 60 +
                60 * 12 +
                parseInt(timeStart.split(":")[1].slice(0, 2));
            minutesDiff = minutesStart - timeInital;
            // console.log(minutesDiff)
        }

        return minutesDiff;
    };

    const semStartDate = new Date(2023, 0, 16);
    const semEndDate = new Date(2022, 4, 10);

    return (
        <>
            {/* helmet tags */}
            <Helmet>
                <title>LUMS Course Scheduler | Project Mirage</title>
                {/* meta data to add:
            - description:
                LUMS Course Scheduler is a tool to help LUMS students plan their course schedules for the upcoming semester. Using LCS you can easily plan your course schedule and see what courses are available for you to take. LCS was created by Project Mirage.
            - keywords:
                - LUMS
                - Course
                - Scheduler
                - Project Mirage
                - LUMS Course Scheduler
                - Lahore University of Management Sciences
                - LUMS Course Scheduler Project Mirage
                - Course Scheduler
                - mfaseehuddin
                - Muhammad Faseeh Ud Din
                - LUMS Course Scheduler Muhammad Faseeh Ud Din
                - Pro Mirage
                - Mirage
                - LUMS Course Planner
            */}
                <meta name="description" content="Course Planner" />
                <meta
                    name="keywords"
                    content="Course Planner, LUMS, LUMS Course Planner, LUMS Course Scheduler, Project Mirage, LUMS Course Scheduler Project Mirage, Course Scheduler, mfaseehuddin, Muhammad Faseeh Ud Din, LUMS Course Scheduler Muhammad Faseeh Ud Din, Pro Mirage, Mirage, LUMS Course Planner"
                />
                <meta name="author" content="Muhammad Faseeh Ud Din" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="theme-color" content="#000000" />
                {/* favicon */}
                <link rel="icon" href={favicon} />
            </Helmet>
            <main className="Main">
                <div className="Heading">
                    <h1>LUMS Course Scheduler | Project Mirage</h1>

                    <h5>Updated Spring 2023</h5>

                    <h5>Semester: {semStartDate.toDateString()} - {semEndDate.toDateString()}</h5>
                    
                </div>

                <div className="calenderContainer">
                    <div className="calender">
                        <Calender
                            SelectedCourses={selectedCourses}
                            parseDay={parseDay}
                            finalCourses={finalCourses}
                            onAdd={addFinalCourse}
                            parseTimeLength={parseTimeLength}
                            parseTimeMargin={parseTimeMargin}
                        />
                    </div>
                </div>

                <div className="courses">
                    <Courses
                        className="courseSelectorPanel"
                        onAdd={addCourse}
                        onRemove={removeCourse}
                        SelectedCourses={selectedCourses}
                        SelectorState={courseSelector}
                        toggle={toggleCourseSelector}
                        Credits={credits}
                    />
                </div>

                <div
                    className="Toggler"
                    onClick={(e) => {
                        toggleCourseSelector();
                    }}
                >
                    {/* <CalGen Courses={selectedCourses} /> */}
                    <img
                        style={
                            courseSelector
                                ? { transform: "rotate(45deg)" }
                                : { transform: "rotate(0)" }
                        }
                        src={addNew}
                    />
                </div>

                <div className="credits">
                    {/* email link */}

                    {/* link style should be plain under lined black text  */}
                    <p>
                        we are looking for developers! email at{" "}
                        <a
                            href="mailto:info@pro-mirage.com"
                            style={{
                                color: "black",
                                textDecoration: "underline",
                            }}
                        >
                            info@pro-mirage.com
                        </a>
                    </p>
                    <p>
                        mfaseehuddin | made with ♥ by{" "}
                        <a
                            href="https://pro-mirage.com"
                            style={{
                                color: "black",
                                textDecoration: "underline",
                            }}
                        >
                            {" "}
                            Project Mirage{" "}
                        </a>
                        2023
                    </p>
                    <div>
                        <a href="https://instagram.com/mfaseehuddin">
                            <img src={instagram} />
                        </a>
                        <a href="https://pro-mirage.com">
                            <img src={mirage} />
                        </a>
                        <a href="https://www.linkedin.com/in/mfaseehuddin2001/">
                            <img src={linkedin} />
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
};

export default IndexPage;
