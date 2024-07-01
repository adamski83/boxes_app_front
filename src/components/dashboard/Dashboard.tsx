import "./dashboard.css";
type MockDataItem = {
  name: string;
  amount: number;
  dimension: [number, number, number];
  usage: [string, string, string];
  picture: string;
  createdAt: string;
};
type MockData = MockDataItem[];

const mockData: MockData = [
  {
    name: "20er",
    amount: 240,
    dimension: [200, 240, 440],
    usage: ["11642", "13636", "52388"],
    picture: "dsfdfs",
    createdAt: "14:24",
  },
  {
    name: "12er",
    amount: 240,
    dimension: [120, 240, 440],
    usage: ["12642", "11636", "42388"],
    picture: "hjdukjkl",
    createdAt: "11:35",
  },
  {
    name: "50er",
    amount: 240,
    dimension: [500, 330, 440],
    usage: ["13642", "53636", "82368"],
    picture: "gjhkghjk",
    createdAt: "14:44",
  },
  {
    name: "60er",
    amount: 240,
    dimension: [600, 440, 540],
    usage: ["11642", "13636", "52388"],
    picture: "ghjkghjk",
    createdAt: "9:34",
  },
  {
    name: "cl350",
    amount: 240,
    dimension: [350, 140, 560],
    usage: ["11642", "13636", "52388"],
    picture: "gkjhl;o'po'",
    createdAt: "10:11",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard__header">
      <div className="dashboard__wraper">
        <h1 id="title">Dashboard</h1>
        {mockData.map((data) => (
          <div className="dashboard__content">
            <h3>{data.name}</h3>
            <p>{data.amount}</p>
            <p>{data.dimension}</p>
            <p>{data.usage}</p>
            <p>{data.picture}</p>
            <p>{data.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
