# api_client.api.DefaultApi

## Load the API package
```dart
import 'package:api_client/api.dart';
```

All URIs are relative to *https://api.example.kwanzago.ao/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**approvePaymentIntent**](DefaultApi.md#approvepaymentintent) | **POST** /passenger/payment-intents/{intentId}/approve | Aprovar intenção no dispositivo do passageiro
[**blockPassengerPaymentAlias**](DefaultApi.md#blockpassengerpaymentalias) | **POST** /passenger/payment-alias/block | Bloquear o QR actual
[**closeOwnerSettlement**](DefaultApi.md#closeownersettlement) | **POST** /owner/settlements/close | Executar fecho simulado idempotente
[**createOperatingAllowance**](DefaultApi.md#createoperatingallowance) | **POST** /owner/operating-allowances | Reservar saldo disponível para operação
[**createPaymentIntent**](DefaultApi.md#createpaymentintent) | **POST** /collector/payment-intents | Criar uma cobrança após leitura do QR
[**declinePaymentIntent**](DefaultApi.md#declinepaymentintent) | **POST** /passenger/payment-intents/{intentId}/decline | Recusar intenção pendente
[**getOwnerOverview**](DefaultApi.md#getowneroverview) | **GET** /owner/overview | Resumo financeiro do proprietário
[**getPassengerPaymentAlias**](DefaultApi.md#getpassengerpaymentalias) | **GET** /passenger/payment-alias | Obter alias QR estático do passageiro
[**getPassengerWallet**](DefaultApi.md#getpassengerwallet) | **GET** /passenger/wallet | Consultar saldo e carteira do passageiro autenticado
[**replacePassengerPaymentAlias**](DefaultApi.md#replacepassengerpaymentalias) | **POST** /passenger/payment-alias/replace | Revogar QR actual e criar outro


# **approvePaymentIntent**
> PaymentResult approvePaymentIntent(intentId, idempotencyKey, approvePaymentIntent)

Aprovar intenção no dispositivo do passageiro

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();
final String intentId = 38400000-8cf0-11bd-b23e-10b96e4ef00d; // String | 
final String idempotencyKey = 38400000-8cf0-11bd-b23e-10b96e4ef00d; // String | 
final ApprovePaymentIntent approvePaymentIntent = ; // ApprovePaymentIntent | 

try {
    final response = api.approvePaymentIntent(intentId, idempotencyKey, approvePaymentIntent);
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->approvePaymentIntent: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **intentId** | **String**|  | 
 **idempotencyKey** | **String**|  | 
 **approvePaymentIntent** | [**ApprovePaymentIntent**](ApprovePaymentIntent.md)|  | 

### Return type

[**PaymentResult**](PaymentResult.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **blockPassengerPaymentAlias**
> blockPassengerPaymentAlias()

Bloquear o QR actual

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();

try {
    api.blockPassengerPaymentAlias();
} on DioException catch (e) {
    print('Exception when calling DefaultApi->blockPassengerPaymentAlias: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **closeOwnerSettlement**
> SettlementBatch closeOwnerSettlement(idempotencyKey)

Executar fecho simulado idempotente

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();
final String idempotencyKey = 38400000-8cf0-11bd-b23e-10b96e4ef00d; // String | 

try {
    final response = api.closeOwnerSettlement(idempotencyKey);
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->closeOwnerSettlement: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 

### Return type

[**SettlementBatch**](SettlementBatch.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createOperatingAllowance**
> createOperatingAllowance(idempotencyKey, createAllowance)

Reservar saldo disponível para operação

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();
final String idempotencyKey = 38400000-8cf0-11bd-b23e-10b96e4ef00d; // String | 
final CreateAllowance createAllowance = ; // CreateAllowance | 

try {
    api.createOperatingAllowance(idempotencyKey, createAllowance);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->createOperatingAllowance: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createAllowance** | [**CreateAllowance**](CreateAllowance.md)|  | 

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createPaymentIntent**
> PaymentIntent createPaymentIntent(idempotencyKey, createPaymentIntent)

Criar uma cobrança após leitura do QR

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();
final String idempotencyKey = 38400000-8cf0-11bd-b23e-10b96e4ef00d; // String | 
final CreatePaymentIntent createPaymentIntent = ; // CreatePaymentIntent | 

try {
    final response = api.createPaymentIntent(idempotencyKey, createPaymentIntent);
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->createPaymentIntent: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **idempotencyKey** | **String**|  | 
 **createPaymentIntent** | [**CreatePaymentIntent**](CreatePaymentIntent.md)|  | 

### Return type

[**PaymentIntent**](PaymentIntent.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **declinePaymentIntent**
> declinePaymentIntent(intentId)

Recusar intenção pendente

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();
final String intentId = 38400000-8cf0-11bd-b23e-10b96e4ef00d; // String | 

try {
    api.declinePaymentIntent(intentId);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->declinePaymentIntent: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **intentId** | **String**|  | 

### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getOwnerOverview**
> OwnerOverview getOwnerOverview()

Resumo financeiro do proprietário

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();

try {
    final response = api.getOwnerOverview();
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->getOwnerOverview: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**OwnerOverview**](OwnerOverview.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPassengerPaymentAlias**
> PaymentAlias getPassengerPaymentAlias()

Obter alias QR estático do passageiro

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();

try {
    final response = api.getPassengerPaymentAlias();
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->getPassengerPaymentAlias: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**PaymentAlias**](PaymentAlias.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPassengerWallet**
> Wallet getPassengerWallet()

Consultar saldo e carteira do passageiro autenticado

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();

try {
    final response = api.getPassengerWallet();
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->getPassengerWallet: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Wallet**](Wallet.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **replacePassengerPaymentAlias**
> PaymentAlias replacePassengerPaymentAlias()

Revogar QR actual e criar outro

### Example
```dart
import 'package:api_client/api.dart';

final api = ApiClient().getDefaultApi();

try {
    final response = api.replacePassengerPaymentAlias();
    print(response);
} on DioException catch (e) {
    print('Exception when calling DefaultApi->replacePassengerPaymentAlias: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**PaymentAlias**](PaymentAlias.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

