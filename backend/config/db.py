from sqlalchemy import create_engine, MetaData

engine = create_engine('mysql+pymysql://root:password123@localhost:3306/test')

meta = MetaData()

conn = engine.connect()