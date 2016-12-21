package com.${CLIENT};

import com.objectedge.middleware.MiddlewareApplication;
import com.objectedge.middleware.MiddlewareConfiguration;
import io.dropwizard.hibernate.HibernateBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import java.util.HashMap;
import java.util.Map;

/**
 * Main Application.
 *
 * @author Mauricio Goncalves Neto <mauricio.neto@objectedge.com>
 * @version 1.0
 * @since 2015-08-10
 */
public class ${PROJECT}MiddlewareApplication extends MiddlewareApplication {

  /**
   * Starts application
   *
   * @param args the input arguments
   * @throws Exception the exception
   */
  public static void main(String[] args) throws Exception {
    new ${PROJECT}MiddlewareApplication().run(args);
  }

  /**
   * Application name
   *
   * @return the application name
   */
  @Override
  public String getName() {
    return "${PROJECT}";
  }

  /**
   * Initialize bundles
   *
   * @param bootstrap
   */
  @Override
  public void initialize(Bootstrap<MiddlewareConfiguration> bootstrap) {
    addMiddlewareEntities();
    super.initialize(bootstrap);
  }

  /**
   * Add custom middleware entities.
   */
  protected void addMiddlewareEntities() {
    //this.middlewareEntities.add(TemporaryInventory.class);
  }

  /**
   * Initialize application and configure resources
   *
   * @param configuration
   * @param environment
   */
  @Override
  public void run(MiddlewareConfiguration configuration, Environment environment) {
    super.run(configuration, environment);
  }

  /**
   * Gets the hibernate bundles map
   *
   * @return the hibernate bundles map
   */
  @Override
  protected Map<String, HibernateBundle<? extends MiddlewareConfiguration>> getHibernateMap() {
    Map<String, HibernateBundle<? extends MiddlewareConfiguration>> bundles = new HashMap<>();
    bundles.put("middleware", super.getMiddlewareBundle());
    return bundles;
    }

}
