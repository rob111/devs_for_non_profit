import React from 'react';
import ReactDOM from 'react-dom';
import Parallax from 'react-springy-parallax';

const Page = ({ offset, caption, first, second, gradient, onClick, url }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" style={{backgroundImage: url}} />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </Parallax.Layer>

    <Parallax.Layer className="text number" offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </Parallax.Layer>

    <Parallax.Layer className="text header" offset={offset} speed={0.4}>
      <span>
        <p style={{ fontSize: 50 }}>{caption}</p>
        <div className={`stripe ${gradient}`} />
        <p style={{ fontSize: 45 }}>{first}</p>
        <p style={{ fontSize: 45 }}>{second}</p>
      </span>
    </Parallax.Layer>
  </React.Fragment>
)

class HomePageContainer extends React.Component {
  scroll = to => this.refs.parallax.scrollTo(to)
  render() {
    return (
      <Parallax className="container" ref="parallax" pages={3} horizontal scrolling={false}>
        <Page
          offset={0}
          gradient="pink"
          caption="who we are"
          first="People who are looking for"
          second="work with a good mission"
          url='url(https://s3.amazonaws.com/devs-for-non-profit-production/uploads/slide_2.jpeg)'
          onClick={() => this.scroll(1)}
          />
        <Page
          offset={1}
          gradient="teal"
          caption="what we do"
          first="Bring developers and non-profit"
          second="organizations together"
          url='url(https://s3.amazonaws.com/devs-for-non-profit-production/uploads/slide_3.jpeg)'
          onClick={() => this.scroll(2)} />
        <Page
          offset={2}
          gradient="tomato"
          caption="what we want"
          first="Everyone can help"
          second="non-profit organizations"
          url='url(https://s3.amazonaws.com/devs-for-non-profit-production/uploads/slide_1.jpeg)'
          onClick={() => this.scroll(0)} />
      </Parallax>
    )
  }
}

export default HomePageContainer;
