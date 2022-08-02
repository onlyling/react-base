import { Modal } from 'antd'
import {
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react'

export interface ImperativeRef {
  show: () => void
  hide: () => void
}

interface ImperativeProps {}

const Imperative = forwardRef<ImperativeRef, ImperativeProps>((_, ref) => {
  const [visible, setVisible] = useState(false)

  const onClose = useCallback(() => {
    setVisible(false)
  }, [])

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => ({
    show,
    hide: onClose,
  }))

  console.log('-- Imperative --')

  return (
    <>
      <p>Imperative</p>

      <Modal visible={visible} footer={null} onCancel={onClose}>
        Modal
      </Modal>
    </>
  )
})

export default memo(Imperative)
