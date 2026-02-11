const ReviewerService = () => {
  const services = [
    "International Conference on Robotics and Automation (ICRA) 2025",
    "International Conference on Intelligent Robots and Systems (IROS) 2025",
    "International Conference on Computer Vision (ICCV) 2025",
    "IEEE Transactions on Robotics (TRO) 2025",
    "IEEE Robotics and Automation Letters (RA-L) 2025",
    "Robotics: Science and Systems (RSS) 2025",
    "International Conference on Machine Learning (ICML), 2024, 2025",
    "International Conference on Learning Representations (ICLR), 2024, 2025",
    "IEEE Conference on Decision and Control (CDC), 2023",
    "Conference on Neural Information Processing Systems (NeurIPS), 2023, 2024",
    "American Control Conference (ACC), 2023",
    "Learning for Dynamics and Control Conference (L4DC), 2023",
    "IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2023",
  ]

  return (
    <div className="mb-8">
      <hr className="my-6 border-t border-gray-300" />
      <h2 className="text-2xl font-semibold mb-4">Reviewer Service</h2>
      <div className="space-y-2">
        {services.map((service, index) => (
          <div key={index} className="text-base">
            {service.split('(').map((part, i) => {
              if (i === 0) return part;
              const [abbr, ...rest] = part.split(')');
              return (
                <span key={i}>
                  (<strong>{abbr})</strong>
                  {rest.join(')')}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewerService
