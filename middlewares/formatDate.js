function formatTimeAgo(date) {
  const now = new Date();
  const timeDifference = now - date;

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;

  if (timeDifference < minute) {
    return (
      Math.floor(timeDifference / 1000) +
      (Math.floor(timeDifference / 1000) === 1 ? " second ago" : " seconds ago")
    );
  } else if (timeDifference < hour) {
    return (
      Math.floor(timeDifference / minute) +
      (Math.floor(timeDifference / minute) === 1
        ? " minute ago"
        : " minutes ago")
    );
  } else {
    return (
      Math.floor(timeDifference / hour) +
      (Math.floor(timeDifference / hour) === 1 ? " hour ago" : " hours ago")
    );
  }
}

module.exports = formatTimeAgo;
