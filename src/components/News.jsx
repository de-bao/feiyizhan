const News = () => {
  const newsItems = [
    { date: '[09/2025]', content: 'Invited talk on Scalable Sim-to-Real Learning for General-Purpose Humanoid Skills at GRASP SFI Seminar.', link: 'https://www.youtube.com/watch?v=sRpx2hkap98' },
    { date: '[08/2025]', content: 'Passed my PhD Thesis Proposal!', link: 'https://www.cs.cmu.edu/calendar/188964850' },
    { date: '[07/2025]', content: 'Hosted WhynotTV Podcast / WhynotTV播客!', link: 'https://tairanhe.com/podcast_en' },
    { date: '[12/2024]', content: 'Received NVIDIA Graduate Fellowship. Thanks, NVIDIA!', link: 'https://research.nvidia.com/graduate-fellowships/2025' },
    { date: '[11/2024]', content: 'Received CMU RI Presidential Fellowship. Thanks, CMU!' },
    { date: '[07/2024]', content: 'ABS is selected as the Outstanding Student Paper Award Finalist at RSS 2024!', link: 'https://roboticsconference.org/2024/program/awards/' },
    { date: '[04/2024]', content: 'Invited talk on Bridging safety, agility and generalization for learning-based robotic control at TechBeat.', link: 'https://www.youtube.com/watch?v=p_Ks7mC1dN4' },
    { date: '[11/2024]', content: 'Received CMU RI Presidential Fellowship. Thanks, CMU!' },
  ]

  return (
    <div className="mb-8">
      <hr className="my-6 border-t border-gray-300" />
      <h2 className="text-2xl font-semibold mb-4">News</h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        {newsItems.map((item, index) => (
          <li key={index} className="text-base">
            {item.date}{' '}
            {item.link ? (
              <>
                {item.content.split(item.link.split('/').pop() || '')[0]}
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary">
                  {item.content.match(/[^[]*$/)?.[0] || item.content}
                </a>
              </>
            ) : (
              item.content
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default News
