import MainTop from "components/MainTop"
import "./style.css"
import SidebarBox from "components/SideBar"
import MainRight from "components/MainRight"
import { useNavigate, useParams } from "react-router-dom"
import FacultyListBox from "components/FacultyListBox"
import { useEffect, useState } from "react"
import { codeToSubjectMap, COURSE_PATH } from "constant"
import { getCoursesByStudy } from "apis"
import coursesByStudy from "types/interface/courses-by-study.interface"
import { ResponseDto } from "apis/response"
import getCoursesByStudyResponseDto from "apis/response/review/get-courses-by-faculty.response.dto"
import courseItem from "types/interface/course-item.interface"

export default function StudyView() {

  const navigator = useNavigate();

  const facultyKeyMap: { [key: string]: string } = {
    ART: "Arts",
    BUS: "Business and Economics",
    CAI: "Creative Arts and Industries",
    EDU: "Education and Social Work",
    ENG: "Engineering",
    LAW: "Law",
    MED: "Medical and Health Sciences",
    SCI: "Science",
    GEN: "General Education",
  }

  const facultyIconMap: { [key: string]: string } = {
    ART: "fa-earth-americas",
    BUS: "fa-money-bill-trend-up",
    CAI: "fa-palette",
    EDU: "fa-school",
    ENG: "fa-robot",
    LAW: "fa-scale-balanced",
    MED: "fa-syringe",
    SCI: "fa-flask-vial",
    GEN: "fa-graduation-cap",
  }

  const facultyColorMap: { [key: string]: string } = {
    ART: "rgb(164, 30, 50)",
    BUS: "rgb(133, 0, 99)",
    CAI: "rgb(229, 102, 11)",
    EDU: "rgb(83, 161, 27)",
    ENG: "rgb(74, 42, 116)",
    LAW: "rgb(3, 97, 143)",
    MED: "rgb(2, 131, 132)",
    SCI: "rgb(0, 85, 160)",
    GEN: "rgb(207, 199, 10)",
  }

  const facultyDescriptionMap: { [key: string]: string } = {
    ART: "Exploring people, culture, and creative expression.",
    BUS: "Understanding markets, money, and how the world trades.",
    CAI: "Designing, performing, and bringing ideas to life.",
    EDU: "Helping people learn, grow, and care for others.",
    ENG: "Solving real-world problems with smart solutions.",
    LAW: "Studying laws, rights, and how society is governed.",
    MED: "Studying health, medicine, and how we care for people.",
    SCI: "Learning about nature, technology, and everything in between.",
    GEN: "A bit of everything to broaden your thinking.",
  }

  const { faculty, studyCode } = useParams()
  const [facultyFullName, setFacultyFullName] = useState<string>("")
  const [showStudyCode, setShowStudyCode] = useState(false)
  const [course, setCourse] = useState<coursesByStudy>({})

  const getCoursesByStudyResponse = (responseBody: ResponseDto | getCoursesByStudyResponseDto | null) => {
    if (!responseBody) return
    const { code } = responseBody
    if (code === 'DBE') alert('Database Error!')
    if (code !== 'SU') return
    const { courses } = responseBody as getCoursesByStudyResponseDto
    setCourse(courses)
  }
  
  const courseOnClick = (courseCode: string) => {
    if (faculty && studyCode) {
      navigator(COURSE_PATH(faculty, studyCode, courseCode));
    }
  }

  useEffect(() => {
    if (faculty && facultyKeyMap[faculty]) {
      setFacultyFullName(facultyKeyMap[faculty])
    }
  }, [faculty])

  useEffect(() => {
    setShowStudyCode(true)
    getCoursesByStudy().then(getCoursesByStudyResponse)
  }, [])

  return (
    <div className='study-view'>
      <MainTop />
      <div className='study-view-bottom'>
        <SidebarBox />
        <div className='study-view-container'>
          <FacultyListBox setHoveredFaculty={() => {}} defaultFacultyKey={faculty} notHoverClick={1} />
          <div className='faculty-view-container-top'>
            <div className='faculty-view-text-box'>
              <i className={`fa-solid ${facultyIconMap[faculty ?? "ART"]} faculty-icon`} style={{ color: facultyColorMap[faculty ?? "ART"] }}></i>
              <div className='faculty-view-text-container'>
                <div className='faculty-view-title'>{facultyFullName}</div>
                {!showStudyCode && (
                  <div className="faculty-view-description">
                    {facultyDescriptionMap[faculty ?? "ART"]}
                  </div>
                )}
              </div>
              {showStudyCode && (
                <div className='right-dir'>
                  <i className="fa-solid fa-angles-right"></i>
                </div>
              )}
              {showStudyCode && (
                <div className='top-study-name fade-in'>
                  {codeToSubjectMap[studyCode ?? "LAWENVIR"]}
                </div>
              )}
            </div>
          </div>
          <div className='study-view-container-bot'>
            {studyCode && course[studyCode] && (() => {
              const items = course[studyCode]

              const extractNumber = (courseName: string): number => {
                const parts = courseName.split(" ")
                return parseInt(parts[1], 10)
              }

              const grouped: { [stage: string]: courseItem[] } = {}

              items.forEach(item => {
                const number = extractNumber(item.courseName)
                const stage = Math.floor(number / 100)
                if (!grouped[stage]) grouped[stage] = []
                grouped[stage].push(item)
              })

              return Object.keys(grouped)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(stage => (
                    <div key={stage} className='course-stage'>
                    <div className='course-stage-index'
                    style={{ color: facultyColorMap[faculty ?? "ART"] }}>
                      {(() => {
                        const stageNum = parseInt(stage);
                        if (stageNum === 1) return "Stage I";
                        if (stageNum === 2) return "Stage II";
                        if (stageNum === 3) return "Stage III";
                        if (stageNum === 4) return "Stage IV";
                        if (stageNum === 6) return "Diploma Courses";
                        return "Postgraduate 700 Level Courses";
                      })()}
                    </div>
                    <div className='course-stage-container'>
                      {grouped[stage]
                        .sort((a, b) => extractNumber(a.courseName) - extractNumber(b.courseName))
                        .map((item, idx) => (
                          <div key={idx} className='course-container' onClick={() => { courseOnClick(item.courseName.replace(/\s+/g, '')) }}>
                            <div className="course-info">
                                <div className='course-code'>{item.courseName}</div>
                                <div className='course-title'>{item.courseTitle ?? "N/A"}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
            })()}
          </div>
        </div>
        <MainRight />
      </div>
    </div>
  )
}