function ProgressBar({currentTask, currentPercentage,  currentPercentageInfo=true, className, taskClassName, percentageClassName, barClassName, backgroundBarClassName}) {
  return (
    <>
      <div className={`base-progressbar ${className}`}>
        <div>
        {currentTask &&
          <span className={`base-progressbar-task ${taskClassName}`}>
            {currentTask}
          </span>
        }
        </div>
        <div className='text-right'>
        {currentPercentageInfo && 
          <span className={`base-progressbar-percentage ${percentageClassName}`}>
            {currentPercentage}%
          </span>
        }
        </div>
      </div>
      <div className={`base-progressbar-background-bar ${backgroundBarClassName}`}>
        <div
          style={{width:`${currentPercentage}%`}}
          className={`base-progressbar-bar ${barClassName}`}>
            
          </div>
      </div>
    </>
  );
}

export default ProgressBar;
