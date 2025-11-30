import DentalHealthOverview from "./DentalHealthOverview";
import NextAppointmentOverview from "./NextAppointmentOverview";

const ActivityOverview = () => {
  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <DentalHealthOverview />
      <div className="flex-1">
        <NextAppointmentOverview />
      </div>
    </div>
  );
};

export default ActivityOverview;
