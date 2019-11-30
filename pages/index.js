import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ReactSpeedometer from "react-d3-speedometer"
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import { type } from 'os';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appTitle: "AQUA",
      aqi: 180,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        aqi: prevState.aqi + 5,
      }))
    }, 5000)
    setInterval(() => {
      this.setState(prevState => ({
        aqi: prevState.aqi - 3,
      }))
    }, 3000)
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <AppBar style={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }} noWrap>
              {this.state.appTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: "150px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography style={{marginBottom: 30}}>Current AQI</Typography>
          <ReactSpeedometer minvalue={0} maxValue={500} value={700} startColor="#00E400" endColor="#FF0000" />
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
            >
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={[
                  {aqi: 150, time: '06:00'},
                  {aqi: 160, time: '07:00'},
                  {aqi: 170, time: '08:00'},
                  {aqi: 200, time: '09:00'},
                  {aqi: 180, time: '10:00'},
                  {aqi: 160, time: '11:00'},
                  {aqi: 130, time: '12:00'},
                  {aqi: 140, time: '13:00'},
                  {aqi: 150, time: '14:00'},
                  {aqi: 180, time: '15:00'},
                  {aqi: 210, time: '16:00'},
                  {aqi: 180, time: '17:00'},
                  {aqi: 165, time: '18:00'},
                ]}
                x="time"
                y="aqi"
              />
            </VictoryChart>
          </div>
          <Typography style={{marginBottom: 30}}>Today</Typography>
          <Button variant="contained" color="primary">Chat with the bot</Button>
        </div>
      </div>
    )
  }
}

export default App