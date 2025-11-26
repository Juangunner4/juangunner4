import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // TODO: Log to error reporting service (e.g., Sentry)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <div style={{
            maxWidth: '600px',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ color: '#FF0000', marginBottom: '20px' }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                textAlign: 'left',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: '#FF0000',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Go to Home Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
