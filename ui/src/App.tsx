import React from 'react';

type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

class TimeOfDay {
  private minuteOfDay: number;

  constructor(hour: number, minute: number = 0) {
    this.minuteOfDay = (hour * 60 + minute) % 1440
  }

  hour(): number {
    return Math.floor(this.minuteOfDay / 60)
  }

  minute(): number {
    return this.minuteOfDay % 60
  }

  string(): string {
    let h = "00" + this.hour().toString()
    let m = "00" + this.minute().toString()
    return `${h.substr(h.length - 2)}:${m.substr(m.length - 2)}`
  }

  cleanString(): string {
    let h = "00" + this.hour().toString()
    let m = "00" + this.minute().toString()
    return `${h.substr(h.length - 2)}${m.substr(m.length - 2)}`
  }

  addMinutes(minutes: number): TimeOfDay {
    return new TimeOfDay(this.hour(), this.minute() + minutes)
  }
}

type Class = {
  day: DayOfWeek
  start: TimeOfDay
  end: TimeOfDay
  subject: string
  teacher?: string
}

const tt: Array<Class> = [
  { day: 'monday', start: new TimeOfDay(8), end: new TimeOfDay(9), subject: "Math", teacher: "Alan" },
  { day: 'monday', start: new TimeOfDay(9), end: new TimeOfDay(11), subject: "English", teacher: "Sarah" },
  { day: 'monday', start: new TimeOfDay(11), end: new TimeOfDay(12), subject: "Science", teacher: "Carly" },
  { day: 'monday', start: new TimeOfDay(12), end: new TimeOfDay(13), subject: "Break" },
  { day: 'monday', start: new TimeOfDay(13), end: new TimeOfDay(14, 30), subject: "Geography", teacher: "Tom" },
  { day: 'monday', start: new TimeOfDay(14, 30), end: new TimeOfDay(15, 30), subject: "Accounting", teacher: "Andy" },
  { day: 'tuesday', start: new TimeOfDay(8), end: new TimeOfDay(9), subject: "History", teacher: "Harry" },
  { day: 'tuesday', start: new TimeOfDay(9), end: new TimeOfDay(10), subject: "Math", teacher: "Alan" },
  { day: 'tuesday', start: new TimeOfDay(10), end: new TimeOfDay(12), subject: "Science", teacher: "Carly" },
  { day: 'tuesday', start: new TimeOfDay(12), end: new TimeOfDay(13), subject: "Break" },
  { day: 'tuesday', start: new TimeOfDay(13), end: new TimeOfDay(14), subject: "English", teacher: "Sarah" },
  { day: 'tuesday', start: new TimeOfDay(14), end: new TimeOfDay(15, 30), subject: "Accounting", teacher: "Andy" },
  { day: 'wednesday', start: new TimeOfDay(8), end: new TimeOfDay(9), subject: "History", teacher: "Harry" },
  { day: 'wednesday', start: new TimeOfDay(9), end: new TimeOfDay(10), subject: "Math", teacher: "Alan" },
  { day: 'wednesday', start: new TimeOfDay(10), end: new TimeOfDay(12), subject: "Science", teacher: "Carly" },
  { day: 'wednesday', start: new TimeOfDay(12), end: new TimeOfDay(13), subject: "Break" },
  { day: 'wednesday', start: new TimeOfDay(13), end: new TimeOfDay(14), subject: "English", teacher: "Sarah" },
  { day: 'wednesday', start: new TimeOfDay(14), end: new TimeOfDay(15, 30), subject: "Accounting", teacher: "Andy" },
  { day: 'thursday', start: new TimeOfDay(8), end: new TimeOfDay(9), subject: "Math", teacher: "Alan" },
  { day: 'thursday', start: new TimeOfDay(9), end: new TimeOfDay(11), subject: "English", teacher: "Sarah" },
  { day: 'thursday', start: new TimeOfDay(11), end: new TimeOfDay(12), subject: "Science", teacher: "Carly" },
  { day: 'thursday', start: new TimeOfDay(12), end: new TimeOfDay(13), subject: "Break" },
  { day: 'thursday', start: new TimeOfDay(13), end: new TimeOfDay(14, 30), subject: "Geography", teacher: "Tom" },
  { day: 'thursday', start: new TimeOfDay(14, 30), end: new TimeOfDay(15, 30), subject: "Accounting", teacher: "Andy" },
  { day: 'friday', start: new TimeOfDay(8), end: new TimeOfDay(9), subject: "Math", teacher: "Alan" },
  { day: 'friday', start: new TimeOfDay(9), end: new TimeOfDay(11), subject: "English", teacher: "Sarah" },
  { day: 'friday', start: new TimeOfDay(11), end: new TimeOfDay(12), subject: "Science", teacher: "Carly" },
  { day: 'friday', start: new TimeOfDay(12), end: new TimeOfDay(13), subject: "Break" },
  { day: 'friday', start: new TimeOfDay(13), end: new TimeOfDay(14, 30), subject: "Geography", teacher: "Tom" },
  { day: 'friday', start: new TimeOfDay(14, 30), end: new TimeOfDay(15, 30), subject: "Accounting", teacher: "Andy" },
]

function App() {
  const days: Array<DayOfWeek> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-16 bg-blue-200">Header</div>
        <div className="overflow-auto">
          <Timetable classes={tt} days={days} timeEnd={new TimeOfDay(15, 30)} timeStart={new TimeOfDay(8)} timeStep={30} />
        </div>
      <div className="h-1/3 w-full bg-blue-200">
        Actions
      </div>
    </div>
  );
}

type TimetableProps = {
  classes: Array<Class>,
  days: Array<DayOfWeek>,
  timeStart: TimeOfDay,
  timeEnd: TimeOfDay,
  timeStep: number,
}

function Timetable(props: TimetableProps) {
  const slots: Array<TimeOfDay> = []
  let d = props.timeStart
  while (d.string() <= props.timeEnd.string()) {
    slots.push(d)
    d = d.addMinutes(props.timeStep)
  }
  return (
    <div className="grid" style={{
      gridTemplateColumns: '[front] 50px ' + props.days.map(d => `[${d}] 100px`).join(" "),
      gridTemplateRows: '[head] 30px ' + slots.map(s => `[t${s.cleanString()}] 60px`).join(' '),
    }}>
      {props.classes.map(t => <TimetableClass key={t.day + t.start.cleanString() + t.end.cleanString()} classProp={t} />)}
      {props.days.map(s => <TimetableHeader key={s} dayOfWeek={s} />)}
      {slots.map(s => <TimetableTimeHeader key={s.cleanString()} slot={s} showBorder={s.string() === props.timeEnd.string()} />)}
    </div>
  )
}

type TimetableHeaderProps = {
  dayOfWeek: DayOfWeek
}

function TimetableHeader({ dayOfWeek }: TimetableHeaderProps) {
  return (
    <div style={{ gridArea: `head / ${dayOfWeek} / span 1 / span 1` }} className="sticky top-0 bg-white border text-center">
      {dayOfWeek.toUpperCase()}
    </div>
  )
}

type TimetableClassProps = {
  classProp: Class
}
function TimetableClass({ classProp }: TimetableClassProps) {
  return (
    <div style={{ gridArea: `t${classProp.start.cleanString()} / ${classProp.day} / t${classProp.end.cleanString()} / span 1` }} className="border-collapse border text-center">
      <div className="sticky top-8">
        <div>{classProp.subject}</div>
        <div>{classProp.teacher}</div>
      </div>
    </div>
  )
}

type TimetableTimeHeaderProps = {
  slot: TimeOfDay
  showBorder: boolean
}
function TimetableTimeHeader({ slot, showBorder }: TimetableTimeHeaderProps) {
  return (
    <div style={{ gridArea: `t${slot.cleanString()} / front / span 1 / span 1` }} className={"sticky left-0 bg-white transform -translate-y-3" + (showBorder ? "" : " border-r")}>
      {slot.string()}
    </div>
  )
}

export default App;
