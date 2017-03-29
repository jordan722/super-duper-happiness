import csv
import json

filename = '../data/immigration.csv'
fieldnames = ("Affirmative", "Apprehended", "Arrived", "Country", "Criminal", "Defensive Asylum", "Inadmissible", "Legal permanant residences.Birth", "Legal permanant residences.Last Residence", "Naturalizations (Birth)", "Non-criminal", "Nonimmigrant Admissions.Birth", "Nonimmigrant Admissions.Last Residence", "Year")

def get_countries():

    csvfile = open(filename, 'rU')
    reader = csv.DictReader(csvfile, fieldnames)
    countries = []
    
    for row in reader:
        if row['Country'] not in countries:
            countries += [row['Country']]

    csvfile.close()
    
    return countries

def country_dict(country):

    csvfile = open(filename, 'rU')
    reader = csv.DictReader(csvfile, fieldnames)
    d = {}

    for row in reader:
        if row['Country'] == country:
            if row['Year'] == '2005':
                d['2005'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2006':
                d['2006'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2007':        
                d['2007'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2008':
                d['2008'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2009':
                d['2009'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2010':                   
                d['2010'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }  
            if row['Year'] == '2011':
                d['2011'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2012':
                d['2012'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2013':
                d['2013'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }
            if row['Year'] == '2014':
                d['2014'] = { 'Apprehended': int(row['Apprehended']),
                              'Naturalized': int(row['Naturalizations (Birth)']) }

    csvfile.close()

    return d

def to_json():
    
    countries = get_countries()

    d = {}
    for country in countries:
        d[country] = country_dict(country)

    with open('../data/immigration.json', 'w') as fp:
        json.dump(d, fp)

to_json()
