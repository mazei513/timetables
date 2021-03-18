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
    <div className="grid h-screen w-screen">
      <div>Header</div>
      <div className="overflow-auto h-full w-full">
        <Timetable classes={tt} days={days} timeEnd={new TimeOfDay(15, 30)} timeStart={new TimeOfDay(8)} timeStep={30} />
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
      {props.classes.map(t => <TimetableClass classProp={t} />)}
      {props.days.map(s => <TimetableHeader dayOfWeek={s} />)}
      {slots.map(s => <TimetableTimeHeader slot={s} showBorder={s.string() === props.timeEnd.string()} />)}
    </div>
  )
}

type TimetableHeaderProps = {
  dayOfWeek: DayOfWeek
}

function TimetableHeader({ dayOfWeek }: TimetableHeaderProps) {
  return (
    <div key={dayOfWeek} style={{ gridColumn: `${dayOfWeek} / span 1`, gridRow: `head / span 1` }} className="sticky top-0 bg-white border text-center">
      {dayOfWeek.toUpperCase()}
    </div>
  )
}

type TimetableClassProps = {
  classProp: Class
}
function TimetableClass({ classProp }: TimetableClassProps) {
  const key = classProp.day + classProp.start.cleanString() + classProp.end.cleanString();
  return (
    <div key={key} style={{ gridColumn: `[${classProp.day}] / span 1`, gridRow: `t${classProp.start.cleanString()} / t${classProp.end.cleanString()}` }} className="border text-center">
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
    <div key={slot.cleanString()} style={{ gridColumn: 'front / span 1', gridRow: `t${slot.cleanString()} / span 1` }} className={"sticky left-0 bg-white transform -translate-y-3" + (showBorder ? "" : " border-r")}>
      {slot.string()}
    </div>
  )
}

export default App;
