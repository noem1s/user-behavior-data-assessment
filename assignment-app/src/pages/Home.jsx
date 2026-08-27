export default function Home() {
  return (
    <div className="row justify-content-center m-0">
      <div className="col-12 col-lg-10">
        <div className="card shadow-sm">
          <div className="card-body p-4 p-md-5">
            
            <h2 className="card-title mb-4 fw-bold">Dataset Information</h2>
            
            
            <p className="card-text lead">
              Sourced from this <a href="https://www.kaggle.com/datasets/valakhorasani/mobile-device-usage-and-user-behavior-dataset?resource=download" target="_blank" rel="noreferrer" className="fw-bold text-primary text-decoration-underline">Kaggle Dataset</a>.
            </p>
            
            <p className="card-text lh-lg text-muted">
              This dataset provides a comprehensive analysis of mobile device usage patterns and user behavior classification. It contains 700 samples of user data, including metrics such as app usage time, screen-on time, battery drain, and data consumption. Each entry is categorized into one of five user behavior classes, ranging from light to extreme usage, allowing for insightful analysis and modeling.
            </p>

            <hr className="my-4" />

            <h4 className="mb-4 fw-bold">Key Features:</h4>
            <ul className="list-group list-group-flush border rounded">
              <li className="list-group-item py-3"><strong>User ID:</strong> Unique identifier for each user.</li>
              <li className="list-group-item py-3"><strong>Device Model:</strong> Model of the user's smartphone.</li>
              <li className="list-group-item py-3"><strong>Operating System:</strong> The OS of the device (iOS or Android).</li>
              <li className="list-group-item py-3"><strong>App Usage Time:</strong> Daily time spent on mobile applications, measured in minutes.</li>
              <li className="list-group-item py-3"><strong>Screen On Time:</strong> Average hours per day the screen is active.</li>
              <li className="list-group-item py-3"><strong>Battery Drain:</strong> Daily battery consumption in mAh.</li>
              <li className="list-group-item py-3"><strong>Number of Apps Installed:</strong> Total apps available on the device.</li>
              <li className="list-group-item py-3"><strong>Data Usage:</strong> Daily mobile data consumption in megabytes.</li>
              <li className="list-group-item py-3"><strong>Age:</strong> Age of the user.</li>
              <li className="list-group-item py-3"><strong>Gender:</strong> Gender of the user (Male or Female).</li>
              <li className="list-group-item py-3"><strong>User Behavior Class:</strong> Classification of user behavior based on usage patterns (1 to 5).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}