import csv
import json

filename = 'data/immigration.csv'
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

def get_total(row):

    tot = 0
    if int(row['Affirmative']) != -1:
        tot += int(row['Affirmative'])
    if int(row['Apprehended']) != -1:
        tot += int(row['Apprehended'])
    if int(row['Arrived']) != -1:
        tot += int(row['Arrived'])
    if int(row['Criminal']) != -1:
        tot += int(row['Criminal'])
    if int(row['Defensive Asylum']) != -1:
        tot += int(row['Defensive Asylum'])
    if int(row['Inadmissible']) != -1:
        tot += int(row['Inadmissible'])
    if int(row['Legal permanant residences.Birth']) != -1:
        tot += int(row['Legal permanant residences.Birth'])
    if int(row['Legal permanant residences.Last Residence']) != -1:
        tot += int(row['Legal permanant residences.Last Residence'])
    if int(row['Naturalizations (Birth)']) != -1:
        tot += int(row['Naturalizations (Birth)'])
    if int(row['Non-criminal']) != -1:
        tot += int(row['Non-criminal'])
    if int(row['Nonimmigrant Admissions.Birth']) != -1:
        tot += int(row['Nonimmigrant Admissions.Birth'])
    if int(row['Nonimmigrant Admissions.Last Residence']) != -1:
        tot += int(row['Nonimmigrant Admissions.Last Residence'])

    return tot

def country_dict(country, row):
    
    country_dict = {}
    
    tot = get_total(row)
    if tot == 0:
        return {}
    
    inad = int(row['Inadmissible']) / (float)(tot) 
    nat =  int(row['Naturalizations (Birth)']) / (float)(tot)

    country_dict['country'] = country
    country_dict['total'] = tot
    country_dict['inadmissible'] = inad
    country_dict['naturalized'] = nat
    country_dict['region'] = "" #will update later
    
    if country in ['Syria', 'Iran', 'Yemen', 'Libya', 'Somalia', 'Sudan']:
        country_dict['highlight'] = True
    else:
        country_dict['highlight'] = False

    return country_dict

def year_list(year):

    csvfile = open(filename, 'rU')
    reader = csv.DictReader(csvfile, fieldnames)

    L = []
    countries = get_countries()

    for row in reader:
        for country in countries:
            if row['Country'] == country and row['Year'] == year:
                cd = country_dict(country, row)
                if cd != {}:
                    L += [cd]

    csvfile.close()
    return L

def to_json():
    
    #countries = get_countries()
    #print countries
    d = {}
    for year in ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']:
        d[year] = year_list(year)

    with open('data/immigration.json', 'w') as fp: 
        json.dump(d, fp)
        
    return d

#print to_json()
