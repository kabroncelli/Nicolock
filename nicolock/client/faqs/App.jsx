import React from 'react'
import PropTypes from 'prop-types'
import helpers from './utils/helpers'

const FaqSelected = (props) => {
  const { question, answer, relatedQuestions } = props.faqSelected
  return (
    <div className='faq-wrap'>
      <div className='faq-answers'>
        <div className='question'>{question}</div>
        <div className='answer'>{answer}</div>
      </div>
      <div className='related-questions'>
        <p className='paragraph'>Related Questions:</p>
        <ul className='misc-menu faq-link'>
          {relatedQuestions ? relatedQuestions.map((question, index) => (
            <li key={`relatedQuestion-${index}`} >
              <span className='link faq neutral-0' onClick={question.selectQuestion}>{question.question}</span>
            </li>
          )) : null}
        </ul>
      </div>
    </div>
  )
}

FaqSelected.propTypes = {
  faqSelected: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    relatedQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        selectQuestion: PropTypes.func.isRequired,
      })
    ),
  }).isRequired,
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      faqList: null,
      faqSelected: null,
    }
  }

  componentWillMount () {
    helpers.getFaqs()
      .then((faqs) => {
        const newFaqList = faqs.group(item => item.category_name)
        this.setState(() => {
          return {
            originalFaqList: faqs,
            faqList: newFaqList,
          }
        }, () => {
          if (newFaqList.length > 0) {
            this.handleChange(newFaqList[0].data[0])
          }
        })
      })
  }

  handleChange = (data) => {
    this.setState((previousState) => {
      return {
        faqSelected: {
          question: data.question,
          answer: data.answer,
          relatedQuestions: previousState.originalFaqList.filter(faq => data.related.includes(faq.id)).map(faq => {
            return {
              question: faq.question,
              selectQuestion: this.handleChange.bind(this, faq),
            }
          }),
        },
      }
    })
  }

  render () {
    return (
      <div className='trifold-content'>
        <div className='trifold-middle faq col-faq'>
          <h1 className='title'>FAQs</h1>
          {!this.state.faqList
            ? <p>Loading</p>
            : this.state.faqList.map((category) => {
              return (
                <div key={category.key}>
                  <p className='paragraph'>{category.key}:</p>
                  <ul className='misc-menu faq-link'>
                    {category.data.map((question, index) => {
                      return (
                        <li key={`question-${index}`}>
                          <span className='link faq neutral-0' onClick={() => this.handleChange(question)}>{question.question}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
        <div className='trifold-data col-faq'>
          {!this.state.faqSelected
            ? <p>Loading</p>
            : <FaqSelected faqSelected={this.state.faqSelected} />}
        </div>
      </div>
    )
  }
}

export default App
