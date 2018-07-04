import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

from flask import (
    Flask,
    render_template,
    jsonify)

engine2 = create_engine("sqlite:///db/mergemap.sqlite", echo=False)
engine = create_engine("sqlite:///db/itemsdb.sqlite", echo=False)

Base = automap_base()
Base.prepare(engine, reflect=True)
session = Session(engine)

Items=Base.classes.itemstb
session = Session(engine)

Base2 = automap_base()
Base2.prepare(engine2, reflect=True)
Base2.classes.keys()
Mergemap=Base2.classes.mergemaptb
session2=Session(engine2)

app = Flask(__name__)


# @app.route("/data")

# def data():

#     sel = [Items.airport_name, func.count(Items.item)]
#     results = session.query(*sel).group_by(Items.airport_name).all()
#     x_axis=[result[0] for result in results]
#     y_axis=[result[1] for result in results]

#     trace={
#         "x":x_axis,
#         "y":y_axis,
#         "type":'bar'
#     }
    
#     return jsonify(trace)

# @app.route("/bardata")

# def data():

#     sel = [Items.airport_name, func.count(Items.item)]
#     results = session.query(*sel).group_by(Items.airport_name).all()
#     # x_axis=[result[0] for result in results]
#     # y_axis=[result[1] for result in results]

#     # trace={
#     #     "x":x_axis,
#     #     "y":y_axis,
#     #     "type":'bar'
#     # }
    
#     return jsonify(results)

@app.route("/data")

def geo():
    sel = [Mergemap.airport_name, Mergemap.latitude_deg, Mergemap.longitude_deg,Mergemap.item]
    data = session2.query(*sel).all()
    
    results = {}
    for datapoint in data:
        name, lat, lon, weapon = datapoint
        if name not in results:
            results[name] = {
                "lat": lat,
                "lon": lon,
                "weapons": {}
            }
        if weapon in results[name]["weapons"]:
            results[name]["weapons"][weapon] += 1
        else:
            results[name]["weapons"][weapon] = 1    
    return jsonify(results)
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)