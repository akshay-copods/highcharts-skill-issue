
import './App.css'
import { WidgetStackBarGraph } from './Graph'
import moment from 'moment-timezone'

function App() {

  const DATA = [
    {
      name: "Highway9",
      data: [0],
      color: '#00FF00',
      
    },
    {
      name: "Verizon",
      data: [15],
      color: '#FFA500'
    },
    {
      name: "AT&T",
      data: [8],
      color: "#FF0000"
    },
    {
      name: "T-Mobile",
      data: [30],
      color: "#FFD700"
    }
  ]
  return (
  <div>
    <WidgetStackBarGraph data={DATA} timezone={moment.tz.guess()} />
  </div>
  )
}

export default App
