import faker from 'faker'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Dropdown, Form, FormControl, Navbar, Table } from 'react-bootstrap'
import {
  CheckAll as CheckAllIcon,
  PlusCircle as PlusCircleIcon,
  SortNumericDownAlt as SortNumericDownIconAlt,
  Trash as TrashIcon,
  X as XIcon,
  ArrowCounterclockwise as ArrowCounterclockwiseIcon,
} from 'react-bootstrap-icons'
import styles from './index.module.scss'

type ISubject = {
  id: string
  name: string
  score: number
  creditsNum: number
  isImprove: boolean
  improvementSubjectId?: string
  improvementSubjects: {
    id: string
    score: number
  }[]
  isVisible: boolean
  disabled?: boolean
}

type ISemester = {
  id: string
  name: string
  subjects: ISubject[]
}

const isValidScore = (score: number) => {
  return score >= 0 && score <= 10 && (score * 10) % 1 === 0
}

const isValidCreditsNum = (creditsNum: number) => {
  return creditsNum > 0 && creditsNum % 1 === 0
}

const getScore4 = (score: number) => {
  if (score < 4) return { score: 0, type: 'F', color: 'rgba(255, 0, 0)' }
  if (score < 5) return { score: 1, type: 'D', color: 'rgba(255, 64, 0)' }
  if (score < 5.5) return { score: 1.5, type: 'D+', color: 'rgba(255, 128, 0)' }
  if (score < 6.5) return { score: 2, type: 'C', color: 'rgba(255, 191, 0)' }
  if (score < 7) return { score: 2.5, type: 'C+', color: 'rgba(255, 255, 0)' }
  if (score < 8) return { score: 3, type: 'B', color: 'rgba(191, 255, 0)' }
  if (score < 8.5) return { score: 3.5, type: 'B+', color: 'rgba(128, 255, 0)' }
  if (score < 9) return { score: 3.7, type: 'A', color: 'rgba(64, 255, 0)' }
  if (score <= 10) return { score: 4, type: 'A+', color: 'rgba(0, 255, 0)' }
  return { score: 0, type: 'F', color: 'rgba(255, 0, 0)' }
}

const getScore41 = (score: number) => {
  if (score < 1) return { type: 'F', color: 'rgba(255, 0, 0)' }
  if (score < 1.5) return { type: 'D', color: 'rgba(255, 64, 0)' }
  if (score < 2) return { type: 'D+', color: 'rgba(255, 128, 0)' }
  if (score < 2.5) return { type: 'C', color: 'rgba(255, 191, 0)' }
  if (score < 3) return { type: 'C+', color: 'rgba(255, 255, 0)' }
  if (score < 3.5) return { type: 'B', color: 'rgba(191, 255, 0)' }
  if (score < 3.7) return { type: 'B+', color: 'rgba(128, 255, 0)' }
  if (score < 4) return { type: 'A', color: 'rgba(64, 255, 0)' }
  if (score <= 10) return { type: 'A+', color: 'rgba(0, 255, 0)' }
  return { score: 0, type: 'F', color: 'rgba(255, 0, 0)' }
}

const initialSemesters: ISemester[] = [
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ I năm 1',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin 1',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Giải tích 1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tin học cơ sở 1',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Đại số',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ II năm 1',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Xác suất thống kê',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tiếng anh A2.1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Những nguyên lý cơ bản của chủ nghĩa Mác-Lênin 2',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Vật lý 1 và thí nghiệm',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Giải tích 2',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tin học cơ sở 2',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ I năm 2',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Tư tưởng Hồ Chí Minh',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ngôn ngữ lập trình C++',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tiếng anh A2.2',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Toán rời rạc 1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Kỹ thuật số',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Vật lý 3 và thí nghiệm',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ II năm 2',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Lý thuyết thông tin',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Toán rời rạc 2',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Kiến trúc máy tính',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Cấu trúc dữ liệu và giải thuật',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Đường lối cách mạng Đảng cộng sản VN',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Xử lý tín hiệu số',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tiếng anh B1.1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ I năm 3',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Kỹ thuật vi xử lý',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tiếng Anh B1.2',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Cơ sở dữ liệu',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Hệ điều hành',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Lập trình hướng đối tượng',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Phương pháp luận nghiên cứu khoa học',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ II năm 3',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Kỹ thuật đồ họa',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'An toàn và bảo mật hệ thống thông tin',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Mạng máy tính',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Nhập môn trí tuệ nhân tạo',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Xử lý ảnh',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Nhập môn công nghệ phần mềm',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ I năm 4',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Các hệ thống phân tán',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Lập trình mạng',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Quản lý dự án phần mềm',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Lập trình Web',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Cơ sở dữ liệu phân tán',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Phân tích và thiết kế hệ thống thông tin',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Học kỳ II năm 4',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Chuyên đề Công nghệ phần mềm',
        creditsNum: 1,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Đảm bảo chất lượng phần mềm',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Kiến trúc và thiết kế phần mềm',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Phát triển phần mềm hướng dịch vụ',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Phát triển ứng dụng cho các thiết bị di động',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Xây dựng các hệ thống nhúng',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
  {
    id: faker.datatype.uuid(),
    name: 'Thực tập',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Thực tập',
        creditsNum: 6,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
    ],
  },
]

export default function () {
  const [semesters, setSemesters] = useState<ISemester[]>(() => {
    const semestersLocal = localStorage.getItem('semesters')
    if (semestersLocal) {
      return JSON.parse(semestersLocal) as ISemester[]
    }

    return initialSemesters
  })

  useEffect(() => {
    localStorage.setItem('semesters', JSON.stringify(semesters))
  }, [semesters])

  const filterSemesters = semesters.map(semester => ({
    ...semester,
    subjects: semester.subjects.filter(subject => !subject.isImprove && subject.isVisible),
  }))

  const finalScore =
    Math.round(
      100 *
        (filterSemesters.reduce(
          (result, semester) =>
            result +
            semester.subjects.reduce((acc, subject) => {
              const maxImprovementSubjectScore = subject.improvementSubjects.reduce(
                (acc, improvementSubject) =>
                  improvementSubject.score > acc ? improvementSubject.score : acc,
                0
              )
              return (
                acc +
                getScore4(
                  maxImprovementSubjectScore > subject.score
                    ? maxImprovementSubjectScore
                    : subject.score
                ).score *
                  subject.creditsNum
              )
            }, 0),
          0
        ) /
          filterSemesters.reduce(
            (result, semester) =>
              result + semester.subjects.reduce((acc, subject) => acc + subject.creditsNum, 0),
            0
          )) || 0
    ) / 100

  return (
    <>
      <Navbar
        style={{ backgroundColor: 'rgb(255, 201, 201)' }}
        expand="lg"
        sticky="top"
        className="flex-column"
      >
        <h2 className="mx-3">
          Điểm trung bình tích lũy (hệ 4):{' '}
          <span
            className={`ms-2 ${styles.badge}`}
            style={{
              backgroundColor: `${getScore41(finalScore).color}`,
            }}
          >
            {finalScore}
          </span>
          <span
            className={`ms-2 ${styles.badge}`}
            style={{
              backgroundColor: `${getScore41(finalScore).color}`,
            }}
          >
            {getScore41(finalScore).type}
          </span>
        </h2>

        <Button
          variant="primary"
          onClick={() => {
            if (confirm('Xác nhận đặt lại dữ liệu')) {
              setSemesters(initialSemesters)
              localStorage.removeItem('semesters')
            }
          }}
          style={{ color: '#fff' }}
          className="me-2"
        >
          <ArrowCounterclockwiseIcon />
          {` `}Reset
        </Button>
      </Navbar>

      <div className="p-3">
        {semesters.map((semester, semesterIndex) => {
          const filterSubjects = semester.subjects.filter(subject => subject.isVisible)

          const averageScore =
            Math.round(
              (100 *
                filterSubjects.reduce(
                  (result, subject) => result + getScore4(subject.score).score * subject.creditsNum,
                  0
                )) /
                filterSubjects.reduce((acc, subject) => acc + subject.creditsNum, 0)
            ) / 100 || 0

          const improvementSubjects = semesters
            .slice(0, semesterIndex)
            .reduce<ISubject[]>(
              (result, _semester) => [
                ...result,
                ..._semester.subjects.filter(
                  subject =>
                    !subject.isImprove &&
                    subject.creditsNum &&
                    subject.isVisible &&
                    semester.subjects.every(
                      _subject => _subject.improvementSubjectId !== subject.id
                    )
                ),
              ],
              []
            )
            .sort((a, b) => a.name.localeCompare(b.name))

          return (
            <Accordion key={semester.id} className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span style={{ fontSize: '1.4rem' }}>{semester.name} (hệ 4: )</span>
                  <span
                    className={`ms-2 ${styles.badge}`}
                    style={{
                      backgroundColor: `${getScore41(averageScore).color}`,
                      fontSize: '1.4rem',
                    }}
                  >
                    {averageScore}
                  </span>
                  <span
                    className={`ms-2 ${styles.badge}`}
                    style={{
                      backgroundColor: `${getScore41(averageScore).color}`,
                      fontSize: '1.4rem',
                    }}
                  >
                    {getScore41(averageScore).type}
                  </span>
                </Accordion.Header>

                <Accordion.Body>
                  <Table borderless hover size="sm">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên môn học</th>
                        <th>Số tín chỉ</th>
                        <th>Điểm hệ 10</th>
                        <th>Môn cải thiện</th>
                        <th>Điểm hệ 4</th>
                        <th>Xóa môn học</th>
                        <th>Hiển thị</th>
                      </tr>
                    </thead>

                    <tbody>
                      {semester.subjects.map((subject, subjectIndex) => (
                        <tr key={subject.id}>
                          <td>{subjectIndex + 1}</td>

                          <td>
                            {subject.isImprove ? (
                              <Dropdown>
                                <Dropdown.Toggle style={{ width: '100%', textAlign: 'left' }}>
                                  {subject.improvementSubjectId
                                    ? `${subject.name} (cải thiện)`
                                    : 'Chọn môn cải thiện'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  {improvementSubjects.map(improvementSubject => (
                                    <Dropdown.Item
                                      key={improvementSubject.id}
                                      onClick={() =>
                                        setSemesters(
                                          semesters.map(_semester => ({
                                            ..._semester,
                                            subjects: _semester.subjects.map(_subject =>
                                              _semester.id === semester.id &&
                                              _subject.id === subject.id
                                                ? {
                                                    ..._subject,
                                                    name: improvementSubject.name,
                                                    creditsNum: improvementSubject.creditsNum,
                                                    score: 0,
                                                    improvementSubjectId: improvementSubject.id,
                                                  }
                                                : {
                                                    ..._subject,
                                                    improvementSubjects:
                                                      improvementSubject.id === _subject.id
                                                        ? [
                                                            ..._subject.improvementSubjects,
                                                            {
                                                              id: subject.id,
                                                              score: 0,
                                                            },
                                                          ]
                                                        : _subject.improvementSubjects,
                                                  }
                                            ),
                                          }))
                                        )
                                      }
                                    >
                                      {improvementSubject.name}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            ) : (
                              <FormControl
                                placeholder="Tên môn học"
                                value={subject.name}
                                onChange={e => {
                                  const name = e.target.value
                                  setSemesters(
                                    semesters.map(_semester => ({
                                      ..._semester,
                                      subjects: _semester.subjects.map(_subject => ({
                                        ..._subject,
                                        name:
                                          (semester.id === _semester.id &&
                                            _subject.id === subject.id) ||
                                          _subject.improvementSubjectId === subject.id
                                            ? name
                                            : _subject.name,
                                      })),
                                    }))
                                  )
                                }}
                                disabled={subject.isImprove || !subject.isVisible}
                                title={subject.name}
                              />
                            )}
                          </td>

                          <td>
                            <FormControl
                              placeholder="Số tín chỉ"
                              value={subject.creditsNum}
                              onChange={e => {
                                const creditsNum = Number(e.target.value)
                                isValidCreditsNum(creditsNum) &&
                                  setSemesters(
                                    semesters.map(_semester => ({
                                      ..._semester,
                                      subjects: _semester.subjects.map(_subject => ({
                                        ..._subject,
                                        creditsNum:
                                          (semester.id === _semester.id &&
                                            _subject.id === subject.id) ||
                                          _subject.improvementSubjectId === subject.id
                                            ? creditsNum
                                            : _subject.creditsNum,
                                      })),
                                    }))
                                  )
                              }}
                              min={1}
                              step={1}
                              type="number"
                              inputMode="decimal"
                              disabled={subject.isImprove || !subject.isVisible}
                            />
                          </td>

                          <td>
                            <FormControl
                              placeholder="Điểm hệ 10"
                              value={subject.score}
                              onChange={e => {
                                const score = Number(e.target.value)
                                if (!isValidScore(score)) return

                                setSemesters(
                                  semesters.map(_semester => ({
                                    ..._semester,
                                    subjects: _semester.subjects.map(_subject => ({
                                      ..._subject,
                                      score:
                                        _semester.id === semester.id && _subject.id === subject.id
                                          ? score
                                          : _subject.score,
                                      improvementSubjects: _subject.improvementSubjects.map(
                                        improvementSubject => ({
                                          ...improvementSubject,
                                          score:
                                            improvementSubject.id === subject.id
                                              ? score
                                              : improvementSubject.score,
                                        })
                                      ),
                                    })),
                                  }))
                                )
                              }}
                              min={0}
                              max={10}
                              step={0.1}
                              type="number"
                              inputMode="numeric"
                              disabled={
                                (subject.isImprove && !subject.improvementSubjectId) ||
                                !subject.isVisible
                              }
                            />
                          </td>

                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={subject.isImprove}
                              onChange={e => {
                                confirm('Xác nhận chọn môn học này là môn học cải thiện?') &&
                                  setSemesters(
                                    semesters.map(_semester =>
                                      semester.id === _semester.id
                                        ? {
                                            ..._semester,
                                            subjects: _semester.subjects.map(_subject =>
                                              _subject.id === subject.id
                                                ? {
                                                    ..._subject,
                                                    score: 0,
                                                    creditsNum: 0,
                                                    isImprove: true,
                                                  }
                                                : _subject
                                            ),
                                          }
                                        : _semester
                                    )
                                  )
                              }}
                              disabled={
                                subject.isImprove ||
                                !subject.isVisible ||
                                !improvementSubjects.length ||
                                subject.improvementSubjects.length > 0
                              }
                            />
                          </td>

                          <td>
                            <span
                              className={`me-2 ${styles.badge}`}
                              style={{
                                backgroundColor: `${getScore4(subject.score).color}`,
                              }}
                            >
                              {getScore4(subject.score).type}
                            </span>

                            {subject.isImprove && (
                              <span
                                className={`${styles.badge}`}
                                style={{ backgroundColor: '#ffc107' }}
                              >
                                Môn cải thiện
                              </span>
                            )}
                          </td>

                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                confirm(
                                  subject.isImprove
                                    ? 'Xác nhận xóa môn học cải thiện này?'
                                    : 'Xác nhận xóa môn học này và cùng các môn học cải thiện sau đó?'
                                ) &&
                                  setSemesters(
                                    semesters.map(_semester => ({
                                      ..._semester,
                                      subjects: subject.isImprove
                                        ? _semester.subjects
                                            .filter(_subject => _subject.id !== subject.id)
                                            .map(_subject => ({
                                              ..._subject,
                                              improvementSubjects:
                                                _subject.improvementSubjects.filter(
                                                  improvementSubject =>
                                                    improvementSubject.id !== subject.id
                                                ),
                                            }))
                                        : _semester.subjects.filter(
                                            _subject =>
                                              _subject.id !== subject.id &&
                                              _subject.improvementSubjectId !== subject.id
                                          ),
                                    }))
                                  )
                              }}
                            >
                              <TrashIcon color="#fff" />
                            </Button>
                          </td>

                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={subject.isVisible}
                              onChange={e => {
                                const isVisible = e.target.checked
                                setSemesters(
                                  semesters.map(_semester => ({
                                    ..._semester,
                                    subjects: _semester.subjects.map(_subject => ({
                                      ..._subject,
                                      isVisible:
                                        (semester.id === _semester.id &&
                                          _subject.id === subject.id) ||
                                        (_subject.improvementSubjectId === subject.id && !isVisible)
                                          ? isVisible
                                          : _subject.isVisible,
                                      disabled:
                                        _subject.improvementSubjectId === subject.id
                                          ? !isVisible
                                          : _subject.disabled,
                                    })),
                                  }))
                                )
                              }}
                              disabled={subject.disabled}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <Button
                    variant="success"
                    onClick={() => {
                      setSemesters(
                        semesters.map(_semester =>
                          semester.id === _semester.id
                            ? {
                                ..._semester,
                                subjects: [
                                  ..._semester.subjects,
                                  {
                                    id: faker.datatype.uuid(),
                                    name: 'Môn học mới',
                                    score: 0,
                                    creditsNum: 0,
                                    isImprove: false,
                                    improvementSubjects: [],
                                    isVisible: true,
                                  },
                                ],
                              }
                            : _semester
                        )
                      )
                    }}
                    style={{ color: '#fff' }}
                    className="me-2"
                  >
                    <PlusCircleIcon />
                    {` `}Thêm môn học
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setSemesters(
                        semesters.map(_semester =>
                          _semester.id === semester.id
                            ? {
                                ..._semester,
                                subjects: _semester.subjects.sort((a, b) => b.score - a.score),
                              }
                            : _semester
                        )
                      )
                    }}
                    style={{ color: '#fff' }}
                    className="me-2"
                  >
                    <SortNumericDownIconAlt />
                    {` `}Sắp xếp
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setSemesters(
                        semesters.map(_semester => ({
                          ..._semester,
                          subjects: _semester.subjects.map(_subject => ({
                            ..._subject,
                            isVisible: _semester.id === semester.id ? true : _subject.isVisible,
                            disabled: semester.subjects.some(
                              __subject => __subject.id === _subject.improvementSubjectId
                            )
                              ? false
                              : _subject.disabled,
                          })),
                        }))
                      )
                    }}
                    style={{ color: '#fff' }}
                    className="me-2"
                  >
                    <CheckAllIcon />
                    {` `}Hiện tất cả
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => {
                      setSemesters(
                        semesters.map(_semester => ({
                          ..._semester,
                          subjects: _semester.subjects.map(_subject => ({
                            ..._subject,
                            isVisible:
                              _semester.id === semester.id ||
                              semester.subjects.some(
                                __subject => __subject.id === _subject.improvementSubjectId
                              )
                                ? false
                                : _subject.isVisible,
                            disabled: semester.subjects.some(
                              __subject => __subject.id === _subject.improvementSubjectId
                            )
                              ? true
                              : _subject.disabled,
                          })),
                        }))
                      )
                    }}
                    style={{ color: '#fff' }}
                    className="me-2"
                  >
                    <XIcon />
                    {` `}Ẩn tất cả
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
      </div>
    </>
  )
}
