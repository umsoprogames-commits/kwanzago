//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_import

import 'package:one_of_serializer/any_of_serializer.dart';
import 'package:one_of_serializer/one_of_serializer.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/serializer.dart';
import 'package:built_value/standard_json_plugin.dart';
import 'package:built_value/iso_8601_date_time_serializer.dart';
import 'package:api_client/src/date_serializer.dart';
import 'package:api_client/src/model/date.dart';

import 'package:api_client/src/model/approve_payment_intent.dart';
import 'package:api_client/src/model/create_allowance.dart';
import 'package:api_client/src/model/create_payment_intent.dart';
import 'package:api_client/src/model/money.dart';
import 'package:api_client/src/model/owner_overview.dart';
import 'package:api_client/src/model/payment_alias.dart';
import 'package:api_client/src/model/payment_intent.dart';
import 'package:api_client/src/model/payment_result.dart';
import 'package:api_client/src/model/settlement_batch.dart';
import 'package:api_client/src/model/wallet.dart';

part 'serializers.g.dart';

@SerializersFor([
  ApprovePaymentIntent,
  CreateAllowance,
  CreatePaymentIntent,
  Money,
  OwnerOverview,
  PaymentAlias,
  PaymentIntent,
  PaymentResult,
  SettlementBatch,
  Wallet,
])
Serializers serializers = (_$serializers.toBuilder()
      ..addBuilderFactory(
        const FullType(
            BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
        () => MapBuilder<String, JsonObject?>(),
      )
      ..add(const OneOfSerializer())
      ..add(const AnyOfSerializer())
      ..add(const DateSerializer())
      ..add(Iso8601DateTimeSerializer()))
    .build();

Serializers standardSerializers =
    (serializers.toBuilder()..addPlugin(StandardJsonPlugin())).build();
