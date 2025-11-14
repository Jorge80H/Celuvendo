#!/usr/bin/env python3
"""
Validate a product object extracted from a ficha before adding to samsung-products.ts

Usage:
    python validate_product.py

This script checks that all required fields are present and properly formatted.
"""

import json
import sys
from typing import Dict, Any, List

# Required fields in a product object
REQUIRED_FIELDS = [
    "sku",
    "name",
    "slug",
    "description",
    "longDescription",
    "brand",
    "price",
    "currency",
    "images",
    "specifications",
    "colors",
    "features",
    "highlights",
    "boxContents",
    "promotion",
    "stock",
    "isActive",
    "isFeatured",
    "rating",
    "reviewCount",
]

# Required nested fields
REQUIRED_NESTED = {
    "specifications": ["screen", "processor", "ram", "storage", "camera", "battery", "connectivity", "security", "os"],
    "specifications.screen": ["size", "type", "resolution", "refreshRate"],
    "specifications.camera": ["main", "front", "features"],
    "specifications.battery": ["capacity"],
    "highlights": ["pros", "cons"],
    "boxContents": ["included", "notIncluded"],
    "promotion": ["active", "title", "description", "expired"],
    "colors[0]": ["name", "code"],
}


def validate_product(product: Dict[str, Any]) -> List[str]:
    """
    Validate a product object and return list of errors (empty if valid)

    Args:
        product: Product dictionary to validate

    Returns:
        List of error messages (empty list if valid)
    """
    errors = []

    # Check required top-level fields
    for field in REQUIRED_FIELDS:
        if field not in product:
            errors.append(f"Missing required field: {field}")

    # Check SKU format
    if "sku" in product:
        sku = product["sku"]
        if not isinstance(sku, str) or len(sku) < 5:
            errors.append(f"Invalid SKU format: {sku}")
        if not sku.isupper() or "-" not in sku:
            errors.append(f"SKU should be uppercase with dashes: {sku}")

    # Check price is a number
    if "price" in product:
        if not isinstance(product["price"], (int, float)):
            errors.append(f"Price must be a number, got: {type(product['price'])}")
        elif product["price"] <= 0:
            errors.append(f"Price must be positive, got: {product['price']}")

    # Check currency
    if "currency" in product and product["currency"] != "COP":
        errors.append(f"Currency should be 'COP', got: {product['currency']}")

    # Check images array
    if "images" in product:
        if not isinstance(product["images"], list) or len(product["images"]) == 0:
            errors.append("Images must be a non-empty array")

    # Check colors array
    if "colors" in product:
        if not isinstance(product["colors"], list) or len(product["colors"]) == 0:
            errors.append("Colors must be a non-empty array")
        else:
            for i, color in enumerate(product["colors"]):
                if "name" not in color:
                    errors.append(f"Color {i} missing 'name'")
                if "code" not in color:
                    errors.append(f"Color {i} missing 'code'")
                elif not color["code"].startswith("#"):
                    errors.append(f"Color {i} code should start with #: {color['code']}")

    # Check features array
    if "features" in product:
        if not isinstance(product["features"], list):
            errors.append("Features must be an array")
        elif len(product["features"]) > 15:
            errors.append(f"Too many features ({len(product['features'])}), max 15 recommended")

    # Check specifications
    if "specifications" in product:
        specs = product["specifications"]
        for field in REQUIRED_NESTED.get("specifications", []):
            if field not in specs:
                errors.append(f"Missing specification: {field}")

        # Check screen specs
        if "screen" in specs:
            screen = specs["screen"]
            for field in REQUIRED_NESTED.get("specifications.screen", []):
                if field not in screen:
                    errors.append(f"Missing screen specification: {field}")

        # Check camera specs
        if "camera" in specs:
            camera = specs["camera"]
            for field in REQUIRED_NESTED.get("specifications.camera", []):
                if field not in camera:
                    errors.append(f"Missing camera specification: {field}")

    # Check highlights
    if "highlights" in product:
        highlights = product["highlights"]
        if "pros" not in highlights or not isinstance(highlights["pros"], list):
            errors.append("Highlights must have 'pros' array")
        if "cons" not in highlights or not isinstance(highlights["cons"], list):
            errors.append("Highlights must have 'cons' array")

        if "pros" in highlights and len(highlights["pros"]) > 10:
            errors.append(f"Too many pros ({len(highlights['pros'])}), max 10 recommended")
        if "cons" in highlights and len(highlights["cons"]) > 10:
            errors.append(f"Too many cons ({len(highlights['cons'])}), max 10 recommended")

    # Check stock
    if "stock" in product:
        if not isinstance(product["stock"], int) or product["stock"] < 0:
            errors.append(f"Stock must be non-negative integer, got: {product['stock']}")

    # Check boolean fields
    for bool_field in ["isActive", "isFeatured"]:
        if bool_field in product and not isinstance(product[bool_field], bool):
            errors.append(f"{bool_field} must be boolean, got: {type(product[bool_field])}")

    # Check rating
    if "rating" in product:
        if not isinstance(product["rating"], (int, float)):
            errors.append(f"Rating must be a number, got: {type(product['rating'])}")
        elif not (0 <= product["rating"] <= 5):
            errors.append(f"Rating must be between 0 and 5, got: {product['rating']}")

    return errors


def format_validation_report(errors: List[str]) -> str:
    """Format validation errors into a readable report"""
    if not errors:
        return "✅ Product validation passed! All required fields present and properly formatted."

    report = f"❌ Product validation failed with {len(errors)} error(s):\n\n"
    for i, error in enumerate(errors, 1):
        report += f"{i}. {error}\n"

    return report


def main():
    """Main validation function"""
    print("Product Validation Tool")
    print("=" * 50)
    print("\nThis tool validates product objects extracted from fichas.")
    print("Copy and paste a product object (JSON format) and press Enter twice:\n")

    # Read multiline input
    lines = []
    while True:
        try:
            line = input()
            if line == "" and len(lines) > 0:
                break
            lines.append(line)
        except EOFError:
            break

    if not lines:
        print("No input provided.")
        return 1

    # Parse JSON
    try:
        product_json = "\n".join(lines)
        product = json.loads(product_json)
    except json.JSONDecodeError as e:
        print(f"\n❌ Invalid JSON: {e}")
        return 1

    # Validate
    errors = validate_product(product)
    report = format_validation_report(errors)
    print("\n" + report)

    return 0 if not errors else 1


if __name__ == "__main__":
    sys.exit(main())
