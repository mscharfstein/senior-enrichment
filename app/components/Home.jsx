import React, { Component } from 'react';

export default function Home() {
  return (
    <div>
      <div className="container">
        <div className="row p10">
          <div className="col-md-3 text-center">
            <img src="/osu.png" className="img-fluid" width="40%" />
          </div>
          <div className="col-md-3 text-center">
            <img src="/michigan.png" className="img-fluid" width="50%" />
          </div>
          <div className="col-md-3 text-center">
            <img src="/minnesota.png" className="img-fluid" width="50%" />
          </div>
          <div className="col-md-3 text-center">
            <img src="/illinois.png" className="img-fluid" width="30%" />
          </div>
        </div>
        <div className="row p10">

          <div className="text-center padding-bottom10">
            <img src="/big_ten_conf_logo.png" className="img-fluid" width="40%" />
          </div>

        </div>
        <div className="row p10">
          <div className="col-md-3 text-center">
            <img src="/indiana.png" className="img-fluid" width="40%" />
          </div>
          <div className="col-md-3 text-center">
            <img src="/maryland.png" className="img-fluid" width="30%" />
          </div>
          <div className="col-md-3 text-center">
            <img src="/northwestern.png" className="img-fluid" width="30%" />
          </div>
          <div className="col-md-3 text-center">
            <img src="/purdue.png" className="img-fluid" width="50%" />
          </div>
        </div>
      </div>
    </div>
  );
}
