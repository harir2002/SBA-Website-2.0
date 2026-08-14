import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-6 text-center">
          <p className="font-heading text-lg font-bold text-primary-red">
            Something went wrong
          </p>
          <pre className="max-w-2xl overflow-auto rounded border border-white/20 bg-white/5 p-4 text-left font-mono text-xs text-white/80">
            {this.state.error?.message}
          </pre>
          <button
            className="rounded bg-primary-red px-4 py-2 font-heading text-sm font-bold text-white uppercase"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
