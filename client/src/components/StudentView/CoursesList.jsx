/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaAngleRight, } from "react-icons/fa6";
import { LoadingSpinner } from "../server/ServerSideBar";
import { CoursesContext } from "@/context/CoursesContext";
import { useContext } from "react";
import { useGetAllUserProgress } from "@/hooks/courses/useGetAllUserProgress";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";
const InfoCard = styled.div`
    background: linear-gradient(180deg, #11131e 29.43%, #0c0e15);
    position: relative;
    overflow: hidden;
`

const Image = styled.div`
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: cover;
    background-position: center top;
`;

const Progress = styled.progress`
position: relative;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    overflow: hidden;
    height: 0.5rem;
    border-radius: var(--rounded-box, 1rem);
`
export default function CoursesList({ studentCourseList, isLoading, isError, error }) {
    const userInfo = useAuthUser()
    const navigate = useNavigate();

    const { data: allProgress, isLoading: isAllProgress, isError: isAllProgressError, error: allProgressError } = useGetAllUserProgress(userInfo.userId);
    function findFirstUnwatchedLecture(courseProgress) {
        if (!courseProgress) return null;

        for (const module of courseProgress.moduleProgress) {
            for (const subModule of module.subModules) {
                for (const lecture of subModule.lectures) {
                    if (!lecture.viewed) {
                        return {
                            moduleId: module,
                            subModuleId: subModule,
                            lectureId: lecture,
                        };
                    }
                }
            }
        }
        return null;
    }
    // In your click handler:
    const handleCourseClick = (courseId) => {
        console.log(courseId)
        const courseProgress = allProgress?.find(prog => prog.courseId === courseId);
        const firstUnwatched = findFirstUnwatchedLecture(courseProgress);
        navigate(`/course/details/${courseId}/${firstUnwatched?.moduleId?.moduleId}/${firstUnwatched?.lectureId?.lectureId}`);
        // If all lectures are watched, go to course details
    };
    const { searchTerm } = useContext(CoursesContext);
    // Filter courses based on search term from context
    const filteredCourses = studentCourseList?.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (isLoading) {
        return <div>
            <LoadingSpinner />
        </div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!studentCourseList || studentCourseList.length === 0) {
        return <div>No courses available.</div>;
    }
    return (
        <div style={{ position: "relative" }} className=" mx-auto w-full flex-1 transition-all duration-200 ease-in-out">
            {filteredCourses.length === 0 ? (
                <div className="text-center text-gray-500">No courses available.</div>
            ) : (
                <div className="grid w-full gap-4 overflow-auto pb-3 lg:grid-cols-2 xl:grid-cols-3 px-3">
                    {filteredCourses.map((item, index) => {
                        const progressData = allProgress?.find(
                            (prog) => prog.courseId === item._id
                        );

                        const totalViewed = progressData?.moduleProgress?.reduce(
                            (acc, module) => acc + module.subModules?.reduce(
                                (subAcc, subModule) => subAcc + (subModule.lectures?.filter(l => l.viewed)?.length || 0),
                                0
                            ),
                            0
                        ) || 0;

                        const totalLectures = progressData?.moduleProgress?.reduce(
                            (acc, module) => acc + module.subModules?.reduce(
                                (subAcc, subModule) => subAcc + (subModule.lectures?.length || 0),
                                0
                            ),
                            0
                        ) || 1; // Prevent division by zero

                        const progressPercentage = totalLectures > 0
                            ? Math.round((totalViewed / totalLectures) * 100)
                            : 0;
                        return (
                            <InfoCard
                                onClick={() => handleCourseClick(item._id)}
                                key={index}
                                style={{ position: "relative" }}
                                className="group flex opacity-90"

                            >
                                <div className="rounded-l-md bg-slate-600/90 p-[3px] duration-300 group-hover:bg-gradient-to-t group-hover:from-my-from group-hover:to-my-to" style={{ position: "relative" }}></div>
                                <div
                                    style={{
                                        backdropFilter: "blur(20px)",

                                        background: "radial-gradient(129.3% 129.3% at 2.03% 8.33%, rgba(54, 54, 54, .489) 0, rgba(19, 21, 29, .307) 100%)"
                                    }}
                                    className="h-full w-full rounded-md rounded-l-none  p-5 sm:px-7 sm:py-6 cursor-pointer"
                                >
                                    <div className="flex gap-7" >
                                        <div className="relative max-w-24 flex-1">
                                            <Image
                                                className="relative h-24 w-full rounded-lg"
                                                imageUrl={`${import.meta.env.VITE_SERVER_API}/uploads/course/${item.image}`}
                                            ></Image>
                                        </div>
                                        <div className="flex w-full flex-1 flex-col sm:w-[280px]">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="mt-1 font-light text-base-content/80 text-xs">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 block">
                                        <div className="mt-2 flex w-full flex-col gap-1 sm:mb-1">
                                            <Progress
                                                value={progressPercentage}
                                                max={100}
                                                className="progress h-1 bg-grey-400 [&::-webkit-progress-value]:bg-secondary progress-primary"
                                            ></Progress>
                                            <p className="mt-1 text-white text-xs text-opacity-80">
                                                {isAllProgress ? "..." : `${progressPercentage}% complete`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-1 ml-auto flex w-full justify-end sm:w-fit ">
                                        <button
                                            className="btn h-10 rounded-s border-none max-sm:w-full duration-500 font-semibold text-my-white bg-[rgb(29,41,50)] group-hover:bg-gradient-to-r group-hover:from-[#a6a6a6] group-hover:to-[#ffffff] group-hover:text-my-black"
                                        >
                                            Enter Course {<FaAngleRight className="ml-2" />}
                                        </button>
                                    </div>
                                </div>
                            </InfoCard>
                        );
                    })}
                </div>
            )}
        </div>
    );

}

