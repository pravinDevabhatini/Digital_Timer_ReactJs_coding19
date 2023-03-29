import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isRunning: false,
    timerLimit: 25,
    currentRunningInSeconds: 0,
  }

  decreaseTimerLimit = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  incrementTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  renderSetTimerControls = () => {
    const {timerLimit, currentRunningInSeconds} = this.state
    const isButtonDisabled = currentRunningInSeconds > 0
    return (
      <div className="set-timer-controls">
        <div className="set-limit-heading-container">
          <p className="set-timer-heading">Set Timer Limit</p>
        </div>
        <div className="inc-dec-time-container">
          <button
            className="inc-sec-button"
            type="button"
            onClick={this.decreaseTimerLimit}
            disabled={isButtonDisabled}
          >
            <h1 className="inc-dec-icon">-</h1>
          </button>
          <div className="time-limit-text-container">
            <p className="time-limit-text">{timerLimit}</p>
          </div>
          <button
            className="inc-sec-button"
            type="button"
            onClick={this.incrementTimerLimit}
            disabled={isButtonDisabled}
          >
            <h1 className="inc-dec-icon">+</h1>
          </button>
        </div>
      </div>
    )
  }

  convertTimeToTimeFormat = () => {
    const {timerLimit, currentRunningInSeconds} = this.state

    const timeInSeconds = timerLimit * 60 - currentRunningInSeconds

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`

    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  startStopTimer = () => {
    const {isRunning, currentRunningInSeconds, timerLimit} = this.state
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
    const isTimeCompleted = currentRunningInSeconds === timerLimit * 60

    if (isTimeCompleted) {
      this.setState((isRunning: false))
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        currentRunningInSeconds: prevState.currentRunningInSeconds + 1,
      }))
    }
  }

  onClickResetTimer = () => {
    this.notifyTimerReset('Timer has me reset to default')
    this.setState({
      isRunning: false,
      timerLimit: 25,
      currentRunningInSeconds: 0,
    })
    this.clearTimer()
  }

  renderTimeControlOptions = () => {
    const {isRunning} = this.state
    const playImageUrl =
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const stopImageUrl =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const resetImageUrl =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'
    const startStopImage = isRunning ? stopImageUrl : playImageUrl
    const startStopAltText = isRunning ? 'pause icon' : 'play icon'
    const startStopText = isRunning ? 'Pause' : 'Start'

    return (
      <div className="control-options-container">
        <button type="button" onClick={this.startStopTimer}>
          <div className="start-stop-container">
            <img
              src={startStopImage}
              className="reset-img"
              alt={startStopAltText}
            />
            <h1 className="start-stop-text">{startStopText}</h1>
          </div>
        </button>
        <button type="button" onClick={this.onClickResetTimer}>
          <div className="start-stop-container">
            <img src={resetImageUrl} className="reset-img" alt="reset icon" />
            <h1 className="start-stop-text">Reset</h1>
          </div>
        </button>
      </div>
    )
  }

  render() {
    const {isRunning} = this.state
    const statusText = isRunning ? 'running' : 'paused'

    return (
      <div className="app-container">
        <div className="header-container">
          <h1>Digital Timer</h1>
        </div>
        <div className="display-timer-container">
          <div className="show-time-container">
            <div className="timer-block">
              <h1>{this.convertTimeToTimeFormat()}</h1>
              <p>{statusText}</p>
            </div>
          </div>
          <div className="timer-control-container">
            {this.renderTimeControlOptions()}
            {this.renderSetTimerControls()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
