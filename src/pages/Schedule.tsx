import AddScheduleForm from '../components/AddSchedule'
import Modal from '../components/Modal'
import Schedules from '../components/Schedules'
import SocialMediaAccounts from '../components/SocialMediaAccounts'
import TopBar from '../components/TopBar'
import { Button } from '../components/ui/button'

const Schedule = () => {
  return (
    <>
      <TopBar pageName="Schedules" />


        <div className="flex gap-2 my-10">
          <Modal id="schedule" content={<AddScheduleForm />} title="Add a new schedule">
            <Button>
              Add Schedule
            </Button>
          </Modal>
          <Modal width='max-w-2xl' id="socailaccounts" content={<SocialMediaAccounts />} title="Connect a social media account">
            <Button>
              Link Social Media Accounts
            </Button>
          </Modal>
        </div>
      <Schedules />


    </>




  )
}

export default Schedule

