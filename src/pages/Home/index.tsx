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
    name: 'H???c k??? I n??m 1',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Nh???ng nguy??n l?? c?? b???n c???a ch??? ngh??a M??c-L??nin 1',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Gi???i t??ch 1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tin h???c c?? s??? 1',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: '?????i s???',
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
    name: 'H???c k??? II n??m 1',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'X??c su???t th???ng k??',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ti???ng anh A2.1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Nh???ng nguy??n l?? c?? b???n c???a ch??? ngh??a M??c-L??nin 2',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'V???t l?? 1 v?? th?? nghi???m',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Gi???i t??ch 2',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Tin h???c c?? s??? 2',
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
    name: 'H???c k??? I n??m 2',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'T?? t?????ng H??? Ch?? Minh',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ng??n ng??? l???p tr??nh C++',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ti???ng anh A2.2',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'To??n r???i r???c 1',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'K??? thu???t s???',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'V???t l?? 3 v?? th?? nghi???m',
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
    name: 'H???c k??? II n??m 2',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'L?? thuy???t th??ng tin',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'To??n r???i r???c 2',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ki???n tr??c m??y t??nh',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'C???u tr??c d??? li???u v?? gi???i thu???t',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: '???????ng l???i c??ch m???ng ?????ng c???ng s???n VN',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'X??? l?? t??n hi???u s???',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ti???ng anh B1.1',
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
    name: 'H???c k??? I n??m 3',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'K??? thu???t vi x??? l??',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ti???ng Anh B1.2',
        creditsNum: 4,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'C?? s??? d??? li???u',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'H??? ??i???u h??nh',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'L???p tr??nh h?????ng ?????i t?????ng',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ph????ng ph??p lu???n nghi??n c???u khoa h???c',
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
    name: 'H???c k??? II n??m 3',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'K??? thu???t ????? h???a',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'An to??n v?? b???o m???t h??? th???ng th??ng tin',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'M???ng m??y t??nh',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Nh???p m??n tr?? tu??? nh??n t???o',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'X??? l?? ???nh',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Nh???p m??n c??ng ngh??? ph???n m???m',
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
    name: 'H???c k??? I n??m 4',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'C??c h??? th???ng ph??n t??n',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'L???p tr??nh m???ng',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Qu???n l?? d??? ??n ph???n m???m',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'L???p tr??nh Web',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'C?? s??? d??? li???u ph??n t??n',
        creditsNum: 2,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ph??n t??ch v?? thi???t k??? h??? th???ng th??ng tin',
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
    name: 'H???c k??? II n??m 4',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Chuy??n ????? C??ng ngh??? ph???n m???m',
        creditsNum: 1,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: '?????m b???o ch???t l?????ng ph???n m???m',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ki???n tr??c v?? thi???t k??? ph???n m???m',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ph??t tri???n ph???n m???m h?????ng d???ch v???',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'Ph??t tri???n ???ng d???ng cho c??c thi???t b??? di ?????ng',
        creditsNum: 3,
        score: 0,
        isImprove: false,
        improvementSubjects: [],
        isVisible: false,
      },
      {
        id: faker.datatype.uuid(),
        name: 'X??y d???ng c??c h??? th???ng nh??ng',
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
    name: 'Th???c t???p',
    subjects: [
      {
        id: faker.datatype.uuid(),
        name: 'Th???c t???p',
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
        <h6>
          ** D??? li???u d???a theo kh??a D18 CNTT{' '}
          <Button
            variant="primary"
            onClick={() => {
              if (confirm('X??c nh???n ?????t l???i d??? li???u')) {
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
        </h6>
        <h2 className="mx-3">
          ??i???m trung b??nh t??ch l??y (h??? 4):{' '}
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
                  <span style={{ fontSize: '1.4rem' }}>{semester.name} (h??? 4: )</span>
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
                        <th>T??n m??n h???c</th>
                        <th>S??? t??n ch???</th>
                        <th>??i???m h??? 10</th>
                        <th>M??n c???i thi???n</th>
                        <th>??i???m h??? 4</th>
                        <th>X??a m??n h???c</th>
                        <th>Hi???n th???</th>
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
                                    ? `${subject.name} (c???i thi???n)`
                                    : 'Ch???n m??n c???i thi???n'}
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
                                placeholder="T??n m??n h???c"
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
                              placeholder="S??? t??n ch???"
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
                              placeholder="??i???m h??? 10"
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
                                confirm('X??c nh???n ch???n m??n h???c n??y l?? m??n h???c c???i thi???n?') &&
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
                                M??n c???i thi???n
                              </span>
                            )}
                          </td>

                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                confirm(
                                  subject.isImprove
                                    ? 'X??c nh???n x??a m??n h???c c???i thi???n n??y?'
                                    : 'X??c nh???n x??a m??n h???c n??y v?? c??ng c??c m??n h???c c???i thi???n sau ?????'
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
                                    name: 'M??n h???c m???i',
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
                    {` `}Th??m m??n h???c
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
                    {` `}S???p x???p
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
                    {` `}Hi???n t???t c???
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
                    {` `}???n t???t c???
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
