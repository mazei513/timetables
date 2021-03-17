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

type Slot = {
  day: DayOfWeek
  start: TimeOfDay
  end: TimeOfDay
  subject: string
  teacher?: string
}

const tt: Array<Slot> = [
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
  const dayStart = new TimeOfDay(8)
  const dayEnd = new TimeOfDay(15, 30)
  const timeStep = 30

  const days: Array<DayOfWeek> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const slots: Array<TimeOfDay> = []
  let d = dayStart
  while (d.string() <= dayEnd.string()) {
    slots.push(d)
    d = d.addMinutes(timeStep)
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '[front] 50px '+ days.map(d => `[${d}] 100px`).join(" "),
      gridTemplateRows: '[head] 30px ' + slots.map(s => `[t${s.cleanString()}] 60px`).join(' '),
    }}>
      {tt.map(t => <div key={t.day+t.start.cleanString()+t.end.cleanString()} style={{gridColumn: `[${t.day}] / span 1`, gridRow: `t${t.start.cleanString()} / t${t.end.cleanString()}`}} className="border text-center"><div style={{position: 'sticky', top: 30}}><div>{t.subject}</div><div>{t.teacher}</div></div></div>)}
      {days.map(s => <div key={s} style={{gridColumn: `${s} / span 1`, gridRow: `head / span 1`, position: 'sticky', top: 0, backgroundColor: 'white'}} className="border text-center">{s.toUpperCase()}</div>)}
      {slots.map(s => <div key={s.cleanString()} style={{gridColumn: 'front / span 1', gridRow: `t${s.cleanString()} / span 1`, position: 'sticky', left: 0, backgroundColor: 'white', transform: "translateY(-13px)", borderRight: "solid 1px"}}>{s.string()}</div>)}
    </div>
  );
}

export default App;
