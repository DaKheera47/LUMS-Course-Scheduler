import React, { useState } from "react";
import { useCourseQuery } from "../../hooks/useCourseQuery";
import tick from "./Images/Tick.png";
import Delete from "./Images/Delete.png";
import Search from "./Images/Search.png";

import "./CoursesStyle.sass";
import CalGen from "../CalGen/CalGen";

export default function Courses({
    onAdd,
    onRemove,
    Courses,
    SelectedCourses,
    SelectorState,
    toggle,
    Credits,
}) {
    const courseData = useCourseQuery();
    const [searchCourse, setSearchCourse] = useState();

    return (
        <div
            className="CourseComponent"
            style={!SelectorState ? { right: "-1000px" } : { right: 0 }}
        >
            <div className="SearchBox">
                <input
                    placeholder="Search" 
                    onChange={(e) => {
                        setSearchCourse(e.target.value.toUpperCase());
                    }}
                />
                <img className="SearchIcon" src={Search} />
            </div>

            <div className="CourseSearching">
                <h3>Available Courses:</h3>
                <ul>
                    {courseData.nodes
                        .filter((course) =>
                            //match course code or course name -> make sure the course name is uppercase
                            //how to use .match() to match the course title and be case insensitive
                            //case insensitive regex -> /i
                            course.Course_Title.toUpperCase().match(searchCourse) || course.Course_Code.toUpperCase().match(searchCourse) || course.Instructor.toUpperCase().match(searchCourse)
                        )
                        .filter((course) => !course.Course_Code.match("w/"))
                        .filter((course) => course.Course_Code !== "")
                        .map((course) => (
                            <li key={course.id}>
                                <div>
                                    <h2>{course.Course_Code} </h2>
                                    <h4>{course.Course_Title}</h4>
                                    <p>{course.Day_and_Time}</p>
                                    <p>{course.Instructor}</p>
                                    <p>{course.Instructions_Mode}</p>
                                    <p>Credits: {course.Cr_Hrs}</p>
                                </div>
                                <div>
                                    <img
                                        src={tick}
                                        className={course.id}
                                        onClick={(e) =>
                                            onAdd(
                                                e.target.className,
                                                course.Cr_Hrs
                                            )
                                        }
                                    />
                                </div>
                            </li>
                        ))}
                </ul>
            </div>

            <div className="SelectedCourses">
                <h3>Selected Courses:</h3>
                <h4>Total Credits: {Credits}</h4>
                <ul>
                    {SelectedCourses.map((course) => (
                        <li key={course.id}>
                            <div>
                                <h2>{course.Course_Code}</h2>
                                <h4>{course.Course_Title}</h4>
                                <p>{course.Day_and_Time}</p>
                                <p>{course.Instructor}</p>
                                <p>{course.Instructions_Mode}</p>
                                <p>Credits: {course.Cr_Hrs}</p>
                            </div>
                            <div>
                                <img
                                    src={Delete}
                                    className={course.id}
                                    onClick={(e) =>
                                        onRemove(e.target.className)
                                    }
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="CalGen">
                <CalGen Courses={SelectedCourses} />
            </div>
            
        </div>
    );
}
