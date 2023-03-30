'use client'
import { motion } from 'framer-motion'
import { MdInfoOutline } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import { useLanguage } from './language'
import Modal from './modal.jobInfo'
import styles from './page.module.css'
import { useState } from 'react'
import dynamic from 'next/dynamic'


const TinderCard = dynamic(() => import('react-tinder-card'), {
  ssr: false,
})


export default function SwipeCard(props) {
  const { id, imgUrl, companyName, jobTitle, shortInfo, days, type, link } =
    props
  const { text } = useLanguage('swe')
  const [showModal, setShowModal] = useState(false)

  // Function to handle swiping the card
  const swiped = (direction) => {
    props.onSwipe(direction)
  }

  // Function to handle when the card is out of the frame
  const outOfFrame = (job) => {
    console.log(job.jobTitle, job.id, 'left the screen!')
  }

  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <div className={styles.swipeContainer}>
      {showModal && (
        <>
          <motion.div
            className={styles.overlay}
            style={{ backgroundImage: `url(${imgUrl})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowModal(false)}
          />
          <Modal
            imgUrl={imgUrl}
            companyName={companyName}
            jobTitle={jobTitle}
            shortInfo={shortInfo}
            days={days}
            id={id}
            type={type}
            link={link}
            text={text}
            setShowModal={setShowModal}
          />
        </>
      )}
      <TinderCard
        className={styles.swipeCardConatiner}
        key={id}
        onSwipe={(dir) => swiped(dir)}
        onCardLeftScreen={() => outOfFrame(props)}
      >
        <div
          className={styles.swipeCard}
          style={{ backgroundImage: `url(${imgUrl})` }}
        >
          <motion.div
            className={styles.uppArrow}
            animate={{ y: -7 }}
            transition={{ type: 'spring', repeat: Infinity, repeatDelay: 2 }}
          >
            <BsChevronDown
              style={{
                fontSize: '3rem',
                color: 'white',
                rotate: '180deg',
                width: '100%',
              }}
            />
          </motion.div>

          <div className={styles.infoConatiner} onClick={handleClick}>
            <h2>
              {companyName}
              <MdInfoOutline
                style={{ fontSize: '1rem', height: '100%', maxHeight: '25px' }}
              />
            </h2>
            <p>{jobTitle}</p>
          </div>
        </div>
      </TinderCard>
    </div>
  )
}
