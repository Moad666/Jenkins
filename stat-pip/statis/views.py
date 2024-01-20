from django.shortcuts import render
import requests
from django.http import JsonResponse

# Create your views here.

def getCountRecipe(request):
    #access_token = request.session.get('access')
    #print(f'Access Token: {access_token}')
    #if not access_token:
    #    return JsonResponse({'error': 'Access token not found'}, status=401)
    
    #headers = {'Authorization': f'Bearer {access_token}'}
    uri = "http://127.0.0.1:8000/api/countRecipe/"
    response = requests.get(uri) #headers=headers)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        # Handle the error
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)

def getCountUsers(request):
    #access_token = request.session.get('access')
    #print(f'Access Token: {access_token}')
    #if not access_token:
    #    return JsonResponse({'error': 'Access token not found'}, status=401)
    
    #headers = {'Authorization': f'Bearer {access_token}'}
    uri = "http://127.0.0.1:8000/api/countUser/"
    response = requests.get(uri) #headers=headers)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        # Handle the error
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)

def getCountComments(request):
    #access_token = request.session.get('access')
    #print(f'Access Token: {access_token}')
    #if not access_token:
    #    return JsonResponse({'error': 'Access token not found'}, status=401)
    
    #headers = {'Authorization': f'Bearer {access_token}'}
    uri = "http://127.0.0.1:8000/api/countComment/"
    response = requests.get(uri) #headers=headers)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        # Handle the error
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)

def getCountRating(request):
    #access_token = request.session.get('access')
    #print(f'Access Token: {access_token}')
    #if not access_token:
    #    return JsonResponse({'error': 'Access token not found'}, status=401)
    
    #headers = {'Authorization': f'Bearer {access_token}'}
    uri = "http://127.0.0.1:8000/api/countRating/"
    response = requests.get(uri) #headers=headers)

    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        # Handle the error
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)