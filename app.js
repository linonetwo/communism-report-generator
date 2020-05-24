class App extends React.Component {
  state = { 正面工作: '', 负面工作: '', 报告: null }

  render() {
    return (
      <div>
        <fieldset>
          <legend>报告构思</legend>
          <label htmlFor="#正面工作">正面工作（在报告中强调）</label>
          <input
            type="text"
            value={this.state.正面工作}
            onChange={(event) => this.setState({ 正面工作: event.target.value })}
            id="正面工作"
          />
          <label htmlFor="#负面工作">负面工作（在报告中批评）</label>
          <input
            type="text"
            value={this.state.负面工作}
            onChange={(event) => this.setState({ 负面工作: event.target.value })}
            id="负面工作"
          />
          <button onClick={() => this.setState({ 报告: 撰写报告(this.state.正面工作, this.state.负面工作) })}>
            撰写报告
          </button>
        </fieldset>
        <article>{this.state.报告}</article>
      </div>
    )
  }
}

const domContainer = document.querySelector('#app')
ReactDOM.render(<App />, domContainer)
